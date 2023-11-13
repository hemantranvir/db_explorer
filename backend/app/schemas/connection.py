from pydantic import BaseModel

class DBCredentials(BaseModel):
    connection_scheme: str
    username: str
    password: str
    database_url: str

class TableInfo(BaseModel):
    table_name: str

class ColumnInfo(BaseModel):
    name: str
    data_type: str
