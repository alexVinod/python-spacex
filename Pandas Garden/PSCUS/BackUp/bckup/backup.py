import sys
import csv
from datetime import datetime
import pyodbc
import pandas as pd

# loop through all the drivers we have access to
# For checking purpose
for driver in pyodbc.drivers():
    print(driver)

class MyDBTest():
    def __init__(self, cons):
        try:
            # define our connection string
            self.cnxn = pyodbc.connect(cons)
            self.cursor = self.cnxn.cursor()
        except pyodbc.Error as err:
            print(err)
            sys.exit(1)

    def insert_query_exe(self):
        try:
            # definer our insert query
            insert_query = '''INSERT INTO tblStudents(id, name, dob, department, mobile) VALUES (?,?,?,?,?)'''

            # insert the data into the database
            self.cursor.execute(insert_query, ("6", "Harish", "1993-09-21", "CSE", "787845125"))

            # Commit the inserts
            self.cnxn.commit()
        except Exception as err:
            print(err)

    def retrive_data(self):
        try:
            # grab all the rows in our database table
            # self.cursor.execute("SELECT * FROM tblStudents")
            sql_q = pd.read_sql_query("SELECT * FROM tblStudents", self.cnxn)
            students_df = pd.DataFrame(sql_q)
            # print(students_df)

        except Exception as err:
            print(err)

        return students_df

    def students_data_csv(self):
        students=self.retrive_data()
        print("-------------------------------------------------------")
        print(students)
        #df = pd.DataFrame(students)
        #sql_q = pd.read_sql_query("SELECT * FROM tblStudents", cnxn)
        # df = pd.DataFrame(sql_q)
        #writer = csv.writer(open("students.csv", 'w'))
        # with open("new_names.csv", "w") as new_file:
        #     csv_writer = csv.writer(new_file)
        #     fieldnames = ["Id", "Name", "Date Of Birth", "Department", "Mobile", "Created On"]
        #     # csv_writer = csv.DictWriter(new_file, fieldnames=fieldnames)
        #     # csv_writer.writeheader()
        #
        #     for student in students:
        #         student[5] = datetime.strftime(student[5], '%d/%m/%y')
        #         # csv_writer.writerow([student[0], student[1], student[2], student[3], student[4], datetime.strftime(student[5], '%d/%m/%y')])
        #         csv_writer.writerow(student)
        #         # del student[5]
        #         # csv_writer.writerow(student)

                #print(student)

if __name__ == "__main__":
    server = "localhost"
    database = "testdatabase"
    db = MyDBTest('DRIVER={ODBC Driver 17 for SQL Server};\
                               SERVER=' + server + '; \
                               DATABASE=' + database + '; \
                               Trusted_Connection=yes;')

    db.insert_query_exe()
    # db.retrive_data()
    db.students_data_csv()









#
# # define the server name and the database name
# server="localhost"
# database="testdatabase"
#
# def connect_to_odbc():
#     try:
#         # define our connection string
#         cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};\
#                                SERVER=' + server + '; \
#                                DATABASE=' + database + '; \
#                                Trusted_Connection=yes;')
#         # create the connection cursor
#         cursor = cnxn.cursor()
#         return (cnxn ,cursor)
#     except Exception as e:
#         print(e)
#
# def insert_query():
#
#     try:
#         #connect_to_odbc()
#         cursor = connect_to_odbc()
#         # definer our insert query
#         insert_query = '''INSERT INTO tblStudents(id, name, dob, department, mobile) VALUES (?,?,?,?,?)'''
#
#         # insert the data into the database
#         cursor.execute(insert_query,("4","Harish","1993-09-21","CSE","787845125"))
#
#         # Commit the inserts
# #         cnxn.commit()
# #     except Exception as e:
# #         print(e)
# # def retrive_data():
# #     cursor.execute("SELECT * FROM tblStudents")
# #
# #         for row in cursor:
# #             print(row)
#
# #
# # try:
# #     # define our connection string
# #     cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};\
# #                            SERVER='+ server +'; \
# #                            DATABASE='+ database +'; \
# #                            Trusted_Connection=yes;')
# #
# #     # create the connection cursor
# #     cursor = cnxn.cursor()
# #
# #     # definer our insert query
# #     insert_query = '''INSERT INTO tblStudents(id, name, dob, department, mobile) VALUES (?,?,?,?,?)'''
# #
# #     # insert the data into the database
# #     cursor.execute(insert_query,("4","Harish","1993-09-21","CSE","787845125"))
# #
# #     # Commit the inserts
# #     cnxn.commit()
#     # grab all the rows in our database table
# #     cursor.execute("SELECT * FROM tblStudents")
# #
# #     for row in cursor:
# #         print(row)
# # except Exception as e:
# #     print(e)
#






















#
# # define the server name and the database name
# server="localhost"
# database="testdatabase"
#
# def connect_to_odbc():
#     try:
#         # define our connection string
#         cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};\
#                                SERVER=' + server + '; \
#                                DATABASE=' + database + '; \
#                                Trusted_Connection=yes;')
#         # create the connection cursor
#         cursor = cnxn.cursor()
#         return (cnxn ,cursor)
#     except Exception as e:
#         print(e)
#
# def insert_query():
#
#     try:
#         #connect_to_odbc()
#         cursor = connect_to_odbc()
#         # definer our insert query
#         insert_query = '''INSERT INTO tblStudents(id, name, dob, department, mobile) VALUES (?,?,?,?,?)'''
#
#         # insert the data into the database
#         cursor.execute(insert_query,("4","Harish","1993-09-21","CSE","787845125"))
#
#         # Commit the inserts
# #         cnxn.commit()
# #     except Exception as e:
# #         print(e)
# # def retrive_data():
# #     cursor.execute("SELECT * FROM tblStudents")
# #
# #         for row in cursor:
# #             print(row)
#
# #
# # try:
# #     # define our connection string
# #     cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};\
# #                            SERVER='+ server +'; \
# #                            DATABASE='+ database +'; \
# #                            Trusted_Connection=yes;')
# #
# #     # create the connection cursor
# #     cursor = cnxn.cursor()
# #
# #     # definer our insert query
# #     insert_query = '''INSERT INTO tblStudents(id, name, dob, department, mobile) VALUES (?,?,?,?,?)'''
# #
# #     # insert the data into the database
# #     cursor.execute(insert_query,("4","Harish","1993-09-21","CSE","787845125"))
# #
# #     # Commit the inserts
# #     cnxn.commit()
#     # grab all the rows in our database table
# #     cursor.execute("SELECT * FROM tblStudents")
# #
# #     for row in cursor:
# #         print(row)
# # except Exception as e:
# #     print(e)
#