import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Formulario() {

    // Obtenemos el contacto que se va a cambiar.-
    const location = useLocation();
    const cambiarContacto = location.state?.contact; // ?. es un operador que devuelve un 'undefined' en caso de que location.state no tenga ningún contacto dentro (cuando entramos por el boton 'add new contact') y asi no rompe la página.-

    const navigate = useNavigate(); // Para ir al la lista de contactos.-
    const [formData, setFormData] = useState({
        name: cambiarContacto ? cambiarContacto.name : "",
        email: cambiarContacto ? cambiarContacto.email : "",
        phone: cambiarContacto ? cambiarContacto.phone : "",
        address: cambiarContacto ? cambiarContacto.address : ""
    });

    const handleChange = (e) => { // Manejo el cambio.-
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Solo actualizo el estado cambiado.-
        });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault(); // evita que se recargue la página
        let result;
        if (cambiarContacto) {
            result = await modificarData(cambiarContacto.id, formData);
        } else {
            result = await crearData(formData);
        }

        if (result) {
            setFormData({ // Aca limpio el formulario cuando se envia.-
                name: "",
                phone: "",
                email: "",
                address: ""
            });
            navigate("/");
        } else {
            alert("Error al crear.")
        }
    }

    const modificarData = async (id, contactoModificado) => {
        try {
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/lucasurq11/contacts/${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contactoModificado)
            })
            if (!res.ok) return false;
            return true;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const crearData = async (nuevoContacto) => {
        try {
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/lucasurq11/contacts/`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(nuevoContacto)
            })
            if (!res.ok) return false;
            return true;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    return (
        <div className="d-flex flex-column container py-5">
            <h1 className="text-center">Add a new contact</h1>
            <form className='text-start' onSubmit={enviarFormulario}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label fw-semibold">Full name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Enter Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direction" className="form-label fw-semibold">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direction"
                        name="address"
                        placeholder="Enter address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-semibold">save</button>
            </form>
            <button
                type="button"
                className="btn btn-link d-flex"
                onClick={() => {
                    navigate("/listadecontacto");
                }}
            >or get back to contacts
            </button>
        </div>
    );
}