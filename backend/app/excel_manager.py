import pandas as pd
import io

def generar_excel_partido(partido_obj):
    """
    Toma un objeto de la base de datos 'Video', extrae sus datos
    y los devuelve en un buffer de memoria como archivo Excel.
    """
    
    # 1. Extraemos los datos del modelo (puedes añadir más campos aquí)
    datos_base = partido_obj.a_diccionario()
    
    # Limpiamos datos que no queremos que el usuario vea en el Excel
    # (por ejemplo, rutas internas del servidor)
    columnas_a_quitar = ['ruta_fichero']
    for col in columnas_a_quitar:
        datos_base.pop(col, None)

    # 2. Convertimos a DataFrame de Pandas
    # Ponemos los datos en una lista [datos] para que Pandas lo trate como una fila
    df = pd.DataFrame([datos_base])

    # 3. Formateo de nombres de columnas para que se vean profesionales
    df.columns = [col.replace('_', ' ').capitalize() for col in df.columns]

    # 4. Creamos el archivo en memoria (Buffer)
    output = io.BytesIO()
    
    # Usamos ExcelWriter para poder dar formato si quisiéramos en el futuro
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Resumen Partido')
        
        # Opcional: Si tuvieras una lista de eventos grabados, 
        # podrías crear otra pestaña así:
        # df_eventos.to_excel(writer, index=False, sheet_name='Detalle Jugadas')

    # Volvemos al principio del archivo virtual para que Flask pueda leerlo
    output.seek(0)
    
    return output