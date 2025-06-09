import React, { useState} from "react";
import "./style.css";

import countries from "./components/countries";
import countryDescriptions from "./components/countryDescriptions";

const MODAL_WIDTH = 350;
const MODAL_HEIGHT = 320;
const MARGIN = 20;

function App() {

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const handleCountryClick = (e, id, title) => {
        const svg = e.target.ownerSVGElement;
        const pt = svg.createSVGPoint();
        pt.x = e.nativeEvent.offsetX;
        pt.y = e.nativeEvent.offsetY;
        const screenCTM = svg.getScreenCTM();
        let { x, y } = pt.matrixTransform(screenCTM);

        // Empêcher la modale de sortir de l'écran (tous les côtés)
        if (x + MODAL_WIDTH + MARGIN > window.innerWidth) {
        x = window.innerWidth - MODAL_WIDTH - MARGIN;
        }
        if (x < MARGIN) {
        x = MARGIN;
        }
        if (y + MODAL_HEIGHT + MARGIN > window.innerHeight) {
        y = window.innerHeight - MODAL_HEIGHT - MARGIN;
        }
        if (y < MARGIN) {
        y = MARGIN;
        }

        setModalPosition({ x, y });
        setSelectedCountry({ id, title });
    };

    const handleCloseModal = () => setSelectedCountry(null);

    return (

        <div className="map">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="280 320 520 265"
                style={{ width: "100%", height: "auto" }}
            >
                {countries.map((country) => (
                    <a key={country.id} xlinkTitle={country.title}>
                    <path
                        id={country.id}
                        title={country.title}
                        d={country.d}

                        onClick={(e) =>
                            handleCountryClick(e, country.id, country.title)
                        }

                        style={{
                            fill: selectedCountry?.id === country.id ? "#646cff" : undefined,
                        }}
                    />
                    </a>
                ))}
            </svg>

            {selectedCountry && (
            <div
                className="map-description"
                style={{
                left: modalPosition.x - 120,
                top: modalPosition.y,
                }}
            >
                <button onClick={handleCloseModal}>X</button>

                <h1>
                    {selectedCountry.title} ({selectedCountry.id})
                </h1>

                <p>
                    {countryDescriptions[selectedCountry.id] || "Lorem ipsum dolor"}
                </p>
                
                <div>
                    <button type="button">Explore more</button>
                </div>

            </div>
            )}
            
        </div>
    );
}

export default App;