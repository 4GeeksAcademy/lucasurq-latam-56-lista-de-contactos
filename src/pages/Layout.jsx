import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"

// Componente base que mantiene la barra de navegación y el pie de página en toda la página y la funcionalidad de desplazamiento hacia la parte superior.
export const Layout = () => {
    return (
        <ScrollToTop>
            <Outlet />
        </ScrollToTop>
    )
}