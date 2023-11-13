from fastapi import HTTPException, APIRouter
from sqlalchemy import create_engine, MetaData
from sqlalchemy import inspect

from app.schemas.connection import DBCredentials, TableInfo, ColumnInfo
from app.utils.app_state import AppState

router = APIRouter()
app_state = AppState()

@router.post("/connect_db")
async def connect_db(db_credentials: DBCredentials):
    database_url = (
        f"{db_credentials.connection_scheme}://{db_credentials.username}:{db_credentials.password}"
        f"@{db_credentials.database_url}"
    )
    try:
        engine = create_engine(database_url)
        metadata = MetaData()
        metadata.reflect(bind=engine)
        app_state.database_url = database_url
        return {"message": "Connected to the database successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get_tables", response_model=list[TableInfo])
async def get_tables():
    try:
        # Connect to the database
        engine = create_engine(app_state.database_url)
        metadata = MetaData()
        metadata.reflect(bind=engine)

        # Get table names
        table_names = metadata.tables.keys()

        return [{"table_name": table_name} for table_name in table_names]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get_table_columns", response_model=list[ColumnInfo])
async def get_table_columns(table_name: str):
    try:
        # Connect to the database
        engine = create_engine(app_state.database_url)
        inspector = inspect(engine)
        columns = inspector.get_columns(table_name)

        return [{"name": str(c['name']), "data_type": str(c['type'])} for c in columns]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get_table_metrics")
async def get_table_metrics(table_name: str):
    try:
        engine = create_engine(app_state.database_url)
        inspector = inspect(engine)
        columns = inspector.get_columns(table_name)
    
        row_count = engine.execute(f'SELECT COUNT(*) FROM public."{table_name}"').scalar()
    
        metrics_dict = {'row_count': row_count, 'columns': []}
    
        # Loop through columns to get metrics
        for column in columns:
            if column['name'] == "id":
                continue
            column_name = column['name']
            data_type = column['type']
            
            # Get null values percentage
            null_percentage = engine.execute(f'SELECT AVG(CASE WHEN "{column_name}" IS NULL THEN 1 ELSE 0 END) * 100 FROM public."{table_name}"').scalar()
            
            # Get unique values percentage
            unique_count = engine.execute(f'SELECT COUNT(DISTINCT "{column_name}") FROM public."{table_name}"').scalar()
            unique_percentage = (unique_count / row_count) * 100
            
            # Get valid values count
            valid_values_count = engine.execute(f'SELECT COUNT("{column_name}") FROM public."{table_name}" WHERE "{column_name}" IS NOT NULL').scalar()
            
            metrics_dict['columns'].append({
                'column_name': column_name,
                'data_type': str(data_type),
                'null_percentage': null_percentage,
                'unique_percentage': unique_percentage,
                'valid_values_count': valid_values_count
            })
    
        return metrics_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

