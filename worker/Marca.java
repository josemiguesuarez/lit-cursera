class Vehiculo
{
   private int kilometrosRecorridos;

   public void inicializar ()
   {
      kilometrosRecorridos = 0;
   }

   public int darKilometrosRecorridos ()
// ^ El método es público y puede ser llamado desde otras clases.
   {
      return kilometrosRecorridos;
   }

}

/**
 * En CupiTips usamos excepcionalmente la clase Main con el fin de
 * mostrar el resultado de la ejecución del código fuente a probar.
 **/
class Main
{
   public static void main (String [] args)
   {
      Vehiculo vehiculo = new Vehiculo();
      vehiculo.inicializar();
      // Con esta instrucción se imprime en la consola
      System.out.println("El carro se inicializó con "
      + vehiculo.darKilometrosRecorridos() + " km recorridos.");
   }
}
