import pytest
import plot_graph
import pickle
 
def test_py():
    with open('mock.data', 'rb') as mock_data:
         [az,ref, rho, zdr, phi,ref_range, rho_range,zdr_range, phi_range, fdate] = pickle.load(mock_data)
    assert isinstance(plot_graph.plot_data(az,ref, rho, zdr, phi,ref_range, rho_range,zdr_range, phi_range, fdate),str)
def test_raises_except():
    with pytest.raises(TypeError):
        plot_graph.plot_data(9)