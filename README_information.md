# PROYECTO REACT FORMS
- Creador: David Ruiz
- Numero: +593 992959886

### El proyecto React Forms se realizo en un estimado de 12 horas (se puede revisar logs de git)

- Utilice una arquitectura de "modularizacion" para dividir cada parte de la app por modulos y que sea facil de escalar

- Se realizo la configuracion de react-redux PERO solo por ejemplo de arquitectura ya que para esta sencilla app considere que no era necesario la utilizacion de redux

- Es altamente escalable, hay un archivo de rutas ya que es pequeña la app pero facilmente al estar modularizada se podria crear un archivo de rutas para cada modulo y simplemente instanciarlas en el routes.jsx principal

- En la carpeta 'infra' es un 'core' de servicios y todas las funciones http, esto prefiero separarlo para crear especie de 'servicios' y que no este junto al componente. Ya que en una app mas grande los servicios lo utilizo para no solo hacer la peticion sino que ahi manipular la data y en los componentes dejarlos mas limpios y tener la data sencilla

- Con typescript en infra añadiria una carpeta models para crear todasd las interfaces de tipos

- Al igual que react-redux, se podria usar Query RKT para optimizar las peticiones

## Esos adicionales se podrain añadir segun las aplicaciones requeridas, por ahora las/los paquetes utilizados en este proyecto fueron utilizados ya que considero suficiente para un proyecto pequeño