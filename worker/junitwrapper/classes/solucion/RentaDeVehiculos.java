package solucion;

public class RentaDeVehiculos {

	public final static int NUM_SUCURSALES = 5;
	private double [] gananciasSucursales;

Esqueleto Pregunta 1

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
