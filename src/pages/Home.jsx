import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Home() {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch('https://playground.4geeks.com/contact/agendas/lucasurq11/contacts');
            if (!res.ok) {
                console.log("Ha ocurrido un error.");
            }
            const resGetData = await res.json();
            setContacts(resGetData.contacts)

        } catch (error) {
            console.error(error);
        }
    }

    const deleteData = async (id) => {
        try {
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/lucasurq11/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!res.ok) {
                console.log('Ha ocurrido algún error.');
            }

            const contactDelete = contacts.filter(contact => contact.id !== id);
            setContacts(contactDelete);


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className="d-flex flex-column container">
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-success justify-content-end my-2"
                    onClick={() => {
                        navigate("/formulario");
                    }}
                >Add new contact</button>
            </div>

            <ul className="list-group">
                {
                    contacts.length > 0 ? (
                        contacts.map(contact => {
                            return (
                                <li key={contact.id} className="list-group-item d-flex">
                                    <div className="p-1 mx-5 d-flex" style={{ width: "150px", height: "150px" }}>
                                        <img src="https://avatar.iran.liara.run/public/24" className="img-fluid" alt="..." />
                                    </div>
                                    <div className="flex-grow-1 d-flex flex-column">
                                        <h6 className='text-start'>{contact.name}</h6>
                                        <div className='d-flex gap-3'>
                                            <div className=''>
                                                <i className="fa-solid fa-location-dot text-secondary"></i>
                                            </div>
                                            <p className='text-secondary'>{contact.address}</p>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <div>
                                                <i className="fa-solid fa-phone-flip text-secondary"></i>
                                            </div>
                                            <p className='text-secondary'>{contact.phone}</p>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <div>
                                                <i className="fa-solid fa-envelope text-secondary"></i>
                                            </div>
                                            <p className='text-secondary'>{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start gap-5 mx-5">
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark border border-0"
                                            onClick={() => {
                                                navigate("/formulario", { state: { contact } });
                                            }}
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark border border-0"
                                            onClick={() => {
                                                console.log("Se hizo click")
                                                alert("Se está por eliminar un contacto. Confirme si está seguro de hacerlo.");
                                                deleteData(contact.id);
                                            }}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    ) : (
                        <div className="alert alert-primary text-center" role="alert">
                            No hay contactos
                        </div>
                    )
                }
            </ul>
        </div>
    );
}