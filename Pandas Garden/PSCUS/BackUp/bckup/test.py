# Importing libraries
import pyodbc
import sqlalchemy as sal
from sqlalchemy import create_engine
import pandas as pd

# Establishing connection to the database
engine = sal.create_engine('mssql+pyodbc://localhost/testdatabase?driver={ODBC Driver 17 for SQL Server}?Trusted_Connection=yes')
"""
server_name : server you want to connect to
database_name : database you want to work with
Trusted_Connection = yes,

If you have set a separate username and password for your SQL database,
sal.create_engine('dialect+driver://username:password@host:port/database')
"""

# establishing the connection to the databse using engine as an interface
conn = engine.connect()

# printing names of the tables present in the database
print(engine.table_names())


# checking whether the connection was actually established by selecting and displaying contents of table from the database
result = engine.execute("select * from tablename")
for row in result:
    print (row)
result.close()

# reading a SQL query using pandas
sql_query = pd.read_sql_query("SELECT * FROM database_name.dbo.tablename", engine)

# saving SQL table in a pandas data frame
df = pd.DataFrame(sql_query, columns = ["column1","column2"])
# printing the dataframe
df


# We can read a CSV, excel file and store its content to a SQL table.
df = pd.read_csv('tablename')
# create a new table and append data frame values to this table
df.to_sql('tablename', con=engine, if_exists='append',index=False,chunksize=1000)


# Closing the connection
conn.close()














import csv
import sqlite3
import logging
from glob import glob; from os.path import expanduser
conn = sqlite3.connect( # open "places.sqlite" from one of the Firefox profiles
    glob(expanduser('~/.mozilla/firefox/*/places.sqlite'))[0]
)
cursor = conn.cursor()
cursor.execute("select * from moz_places;")
#with open("out.csv", "w", newline='') as csv_file:  # Python 3 version
with open("out.csv", "wb") as csv_file:              # Python 2 version
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow([i[0] for i in cursor.description]) # write headers
    csv_writer.writerows(cursor)



logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s:%(name)s:%(message)s')

file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.ERROR)
file_handler.setFormatter(formatter)

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)

logger.addHandler(file_handler)
# logger.addHandler(stream_handler)