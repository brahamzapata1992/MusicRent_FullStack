import React, { useState, useEffect, useRef } from "react";
import { useApi } from "../../../../../../context/ApiContext";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Calendario.css";
import es from "date-fns/locale/es";

import Modal from "react-modal";
import alertap from "../../../../../../assets/calendario/Imagen de WhatsApp 2024-04-02 a las 16.38.13_ba42fd00.jpg";

Modal.setAppElement("#root"); // Establecer el elemento raíz de la aplicación para el modal

function Calendario({ onDateSelect }) {
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [monthsToShow, setMonthsToShow] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });
  const inputBoxRef = useRef(null);
  const calendarioCardRef = useRef(null);
  const dateRangeRef = useRef(null); // Ref para el componente DateRange
  

  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const startDate = new Date(now - offset - 5 * 60 * 60 * 1000);
  const endDate = new Date(now - offset - 5 * 60 * 60 * 1000);

  const [startFecha, setStartFecha] = useState(startDate);
  const [endFecha, setEndFecha] = useState(endDate);
  const [showModal, setShowModal] = useState(false);

  const hideOnClickOutside = (e) => {
    if (!inputBoxRef.current || !calendarioCardRef.current) return;

    if (
      !inputBoxRef.current.contains(e.target) &&
      !calendarioCardRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Manejar el evento click para ocultar fuera del elemento
    document.addEventListener("click", hideOnClickOutside, true);

    // Limpiar los listeners de eventos al desmontar el componente
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange({ startDate, endDate });    
    if (fechasOcupadas.some((date) => startDate <= date && date <= endDate)) {
      // Si alguna fecha está bloqueada, mostrar modal
      setShowModal(true);
    } else {
      // Si no hay fechas bloqueadas, actualizar las fechas de inicio y fin
      setStartFecha(startDate);
      setEndFecha(endDate);
      setOpen(false); // Cerrar el calendario después de seleccionar las fechas
      // Enviar las fechas seleccionadas al componente padre
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(endDate, "yyyy-MM-dd");
        onDateSelect(formattedStartDate, formattedEndDate);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth <= 768 ? 1 : window.innerWidth <= 360 ? 1 : 2);
    };

    // Llama a handleResize al cargar la página para establecer el número de meses inicial
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="search-bar" ref={inputBoxRef}>
      <input
        value={`${format(startFecha, "MM/dd/yyyy")} to ${format(
          endFecha,
          "yyyy/MM/dd"
        )}`}
        readOnly
        className="inputBox"
        onClick={handleClick}
      />
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Error fecha"
        className="Modal"
      >
        <div className="modal-user-edition">
          <img className="img-modal-edition" src={alertap} alt="" />
          <h4 className="text-modal-user">Lo sentimos</h4>
          <p className="text-modal-user-p">
            La fecha escogida no está disponible, por favor lo invitamos a
            seleccionar otra fecha.
          </p>
          <button className="boton-modal-user" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </Modal>
      {open && (
        <div className="calendario-card" ref={calendarioCardRef}>
          <DateRange
            ref={dateRangeRef} // Pasar la ref al componente DateRange
            ranges={[
              { startDate: startFecha, endDate: endFecha, key: "selection" },
            ]}
            onChange={handleSelect}
            rangeColors={["#fda310"]}
            disabledDates={fechasOcupadas}
            showDateDisplay={false}
            months={monthsToShow}
            direction="horizontal"
            locale={es}
            minDate={new Date()}
            style={{ textTransform: "capitalize" }}
            onClick={(event) => {
              const clickedDate = event.target.getAttribute("aria-label");
              if (clickedDate) {
                const date = new Date(clickedDate);
                if (
                  fechasOcupadas.some(
                    (dateOcupada) =>
                      dateOcupada.getTime() === date.getTime() ||
                      (selectedRange.startDate &&
                        selectedRange.endDate &&
                        date >= selectedRange.startDate &&
                        date <= selectedRange.endDate)
                  )
                ) {
                  setShowModal(true);
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Calendario;





