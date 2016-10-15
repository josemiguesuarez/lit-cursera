package co.edu.uniandes.CumpiExamen.VO;

import com.google.gson.Gson;
/**
 * Clase que modela el resultado de un metodo @Test de una clase JUnit. 
 * @author JoséLuis
 *
 */
public class MetodoTest {
	/**
	 * Nombre del metodo dentro de la clase.
	 */
	private String  nombre;	
	/**
	 * Resultado del metodo dentro de la prueba.
	 */
	private boolean correcto;
	/**
	 * Mensaje de fallo del metodo.
	 */
	private String mensaje;
	
	
	public MetodoTest(){
		this.correcto = true;
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public boolean isCorrecto() {
		return this.correcto;
	}
	public void setCorrecto(boolean correcto) {
		this.correcto = correcto;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	/**
	 * Formatea el objeto a JSon
	 * @return Un string con el objeto seralizado como json
	 */
	public String toJson(){
		String jsonFormat;
		Gson gson = new Gson();
		jsonFormat = gson.toJson(this);
		return jsonFormat;
	}

}
