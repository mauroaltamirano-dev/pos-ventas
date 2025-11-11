import styled from "styled-components";
import { useThemeStore } from "../../store/ThemeStore";

export function ToggleTheme() {
  const { setTheme } = useThemeStore();

  return (
    <Container>
      <label className="switch">
        <input type="checkbox" id="switch" onClick={setTheme} />
        <span className="slider">
          <div className="icon-wrapper">
            <div className="icon icon--moon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981"
                />
              </svg>
            </div>

            <div className="icon icon--sun">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"
                />
              </svg>
            </div>
          </div>
        </span>
      </label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  width: 100%;

  .switch {
    position: relative;
    display: inline-block;
    width: 75px;
    height: 40px;
  }

  /* Oculta el checkbox nativo */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* Fondo del switch */
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: ${({ theme }) => theme.bg3 || "#e2e2e2"};
    border-radius: 50px;
    transition: background 0.4s ease, box-shadow 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 3px;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Íconos dentro del slider */
  .icon-wrapper {
    position: relative;
    width: 35px;
    height: 35px;
    background: ${({ theme }) => theme.bgTotal};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text};
    transition: all 0.4s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  /* Animaciones de íconos */
  .icon {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.4s ease;
  }

  .icon--sun {
    opacity: 0;
    transform: scale(0) rotate(-90deg);
    color: #ffcf33;
    padding: 10px;
  }

  .icon--moon {
    opacity: 1;
    padding: 10px;
    transform: scale(1) rotate(0deg);
    color: #6d8cff;
  }

  /* Estado: activado */
  input:checked + .slider {
    background: ${({ theme }) => theme.color2};
    justify-content: flex-end;
  }

  input:checked + .slider .icon-wrapper {
    background: ${({ theme }) => theme.bgTotal};
    color: ${({ theme }) => theme.text};
  }

  input:checked + .slider .icon--sun {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  input:checked + .slider .icon--moon {
    opacity: 0;
    transform: scale(0) rotate(90deg);
  }
`;
