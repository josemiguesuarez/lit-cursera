package co.edu.uniandes.CumpiExamen;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

import com.google.gson.Gson;

import co.edu.uniandes.CumpiExamen.VO.MetodoTest;
/**
 * Clase que ejecuta una test JUnit, recopila los resultados
 * y finalmente los imprime en consola en forato Json.
 * Como argumento de ejecucion recibe el nommbre completo de la clase JUnit.
 * @author JoséLuis
 *
 */
public class TestRunner {

	/**
	 * Contiene los metodos de la clase de las pruebas.
	 */
	private LinkedHashMap<String, MetodoTest> hm;
	/**
	 * Instancia tipo Class asociada a la clase JUnit a evaluar.
	 */
	private Class<?> claseTest;

	public static void main(String[] args) {

		if (args != null && args.length > 0 && args[0].trim().length() > 0) {
			try {
				TestRunner test = new TestRunner();
				/**
				 * Inicializa la clase de Test con el nombre completo de la
				 * clase Test definida por el profesor.
				 */
				test.setClaseTest(Class.forName(args[0].trim()));
				/**
				 * Carga los metodos test de la clase Test.
				 */
				test.cargaMetodos();
				/**
				 * Ejecutar Pruebas
				 */
				if (!test.ejecutaTest()) {
					//System.out.println("	Test :: Failure ");
				} else {
					//System.out.println("	Test :: Successful ");
				}
				/**
				 * Imprime resultado del Test
				 */
				test.imprimeJson();
			} catch (ClassNotFoundException e) {
				MetodoTest metodo = new MetodoTest();
				metodo.setNombre("CE_ERROR_001");
				metodo.setCorrecto(false);
				metodo.setMensaje("ERROR Cumpiexamenes JUnit TestRunner :: Nombre de la clase JUnit para test no reconocida.");

				System.out.println(metodo.toJson());
			}
		} else {
			MetodoTest metodo = new MetodoTest();
			metodo.setNombre("CE_ERROR_001");
			metodo.setCorrecto(false);
			metodo.setMensaje("ERROR Cumpiexamenes JUnit TestRunner :: Nombre de la clase JUnit para test no reconocida.");

			System.out.println(metodo.toJson());
		}
	}

	public LinkedHashMap<String, MetodoTest> getHm() {
		return hm;
	}

	public void setHm(LinkedHashMap<String, MetodoTest> hm) {
		this.hm = hm;
	}
/**
 * Ejecuta la clase JUnit y captura los metodos que fallaron para su posterior impresion
 * @return resultado de la ejecucion de la clase JUnit.
 */
	public boolean ejecutaTest() {
		MetodoTest metodo;
		Result result = JUnitCore.runClasses(this.getClaseTest());
		/* Se identifican los metodos fallaron en la prueba. */
		for (Failure failure : result.getFailures()) {
			metodo = (MetodoTest) this.getHm().get(this.getNombreMetodo(failure.toString()));
			if (metodo != null) {
				((MetodoTest) this.getHm().get(this.getNombreMetodo(failure.toString()))).setCorrecto(false);
				((MetodoTest) this.getHm().get(this.getNombreMetodo(failure.toString()))).setMensaje(failure.getMessage());
			}
		}

		return result.wasSuccessful();

	}
/**
 * Imprime la coleccion de objetos tipo MetodoTest, resultado de la ejecucion
 * de la clase JUnit.
 */
	public void imprimeJson() {
		List<MetodoTest> valueList = new ArrayList<MetodoTest>(this.getHm().values());
		Gson gson = new Gson();
		System.out.println(gson.toJson(valueList));
	}

	/**
	 * Carga un hashMap con los metodos Test de la clase de Test.
	 */
	public void cargaMetodos() {
		this.hm = getMetodos();
	}

	/**
	 * Obtiene los metodos TEST asociados a la clase de pruebas(Que tienen un
	 * annotation @Test).
	 * 
	 * @return LinkedHashMap de los metodos, donde la llave es el nombre del
	 *         metodo y el objeto es una instancia de la clase Metodo.
	 */
	private LinkedHashMap<String, MetodoTest> getMetodos() {
		LinkedHashMap<String, MetodoTest> mapa;
		Method metodos[];
		Annotation anotaciones[];
		mapa = new LinkedHashMap<String, MetodoTest>();
		metodos = claseTest.getDeclaredMethods();
		for (int i = 0; i < metodos.length; i++) {
			anotaciones = metodos[i].getAnnotations();
			for (int j = 0; j < anotaciones.length; j++) {
				if (anotaciones[j] instanceof Test) {
					MetodoTest metodo = new MetodoTest();
					metodo.setNombre(metodos[i].getName());
					mapa.put(metodo.getNombre(), metodo);
				}
			}
		}
		return mapa;
	}

	/**
	 *  Extrae el nombre del metodo de Test en la cadena de salida. 
	 */
	private String getNombreMetodo(String cadena) {
		String nombre = "";
		nombre = cadena.substring(0, cadena.indexOf("("));
		return nombre;
	}

	public Class<?> getClaseTest() {
		return claseTest;
	}

	public void setClaseTest(Class<?> claseTest) {
		this.claseTest = claseTest;
	}

}
