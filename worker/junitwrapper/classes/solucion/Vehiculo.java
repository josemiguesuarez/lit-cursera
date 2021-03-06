package solucion;

public class RentaDeVehiculos {

	public final static int NUM_SUCURSALES = 5;
	private double [] gananciasSucursales;

public double darGananciasAcomuladasRenta()
	{
		double gananciasAcomuladas = 0.0;
		for (int i = 0; i < gananciasSucursales.length; i++) {
			gananciasAcomuladas += gananciasSucursales[i];
		}
		return gananciasAcomuladas;
	}

	public RentaDeVehiculos ()
	{
		gananciasSucursales = new double [NUM_SUCURSALES];
	}

	public boolean estanLasGananciasPorEncimaDeLaMeta( double meta)
	{
		return darGananciasAcomuladasRenta() > meta;
	}



	public void registrarGananciasSucursal ( int idSucursal, double ganancias)
	{
		gananciasSucursales[idSucursal] = ganancias;
	}
}
