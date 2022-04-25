import splunklib.client as client
import splunklib.results as results
def splunk_connect():
    service = client.connect(
                   host="HOST",
                   port=8089,
                   username="USERNAME",
                   password="PWD" )
    query= """search index=xxx application="xxx" sourcetype=xxx| 
    spath visitId  | join type ..."""
    rr = results.ResultsReader(service.jobs.export(query))

    for item in rr:
        for key in item.keys():
            print(key, len(item[key]), item[key])

    kwargs_oneshot = {'output_mode': 'csv',"search_mode": "normal"}
    oneshotsearch_results = service.jobs.oneshot(query, **kwargs_oneshot)
    f=open('myresults.csv', 'w')
    f.write(oneshotsearch_results.read())


    results_kwargs = {
     "earliest_time": "-40min",
     "latest_time": "now",
     "search_mode": "normal",
     "output_mode": "csv"
    }
    oneshotsearch_results = service.jobs.oneshot(query, **results_kwargs, count=0)

    f=open('myresults.csv', 'w')
    f.write(oneshotsearch_results.read())
    f.close()

#https://community.splunk.com/t5/Developing-for-Splunk-Enterprise/Python-SDK-save-search-to-csv/m-p/420166#M3601
#https://community.splunk.com/t5/Developing-for-Splunk-Enterprise/Export-to-csv-is-not-fetching-all-the-results-Python-Splunk-SDK/td-p/432548?minQuestionBodyLength=80