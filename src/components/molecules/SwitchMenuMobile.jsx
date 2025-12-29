import styled from "styled-components";

export function SwitchMenuMobile({ state, setstate }) {
  return (
    <Container id="menuToggle">
      <input
        id="checkbox"
        type="checkbox"
        checked={state}
        onChange={setstate}
      />
      <label className={state ? "toggle active" : "toggle"} htmlFor="checkbox">
        <div className="bar bar--top"></div>
        <div className="bar bar--middle"></div>
        <div className="bar bar--bottom"></div>
      </label>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  left: 8px;
  top: 8px;

  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    cursor: pointer;
    margin: auto;
    display: block;
    height: calc(4px * 3 + 11px * 2);
    transform: scale(0.6);
  }

  .bar {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: calc(4px / 2);
    background: ${({ theme }) => theme.text};
    color: inherit;
    opacity: 1;
    transition: none 0.35s cubic-bezier(0.5, -0.35, 0.35, 1.5) 0s;
  }

  /***** Tornado Animation *****/

  .bar--top {
    bottom: calc(50% + 11px + 4px / 2);
    transition-property: bottom, transform;
    transition-delay: calc(0s + 0.35s) * 0.6;
  }

  .bar--middle {
    top: calc(50% - 4px / 2);
    transition-property: opacity, transform;
    transition-delay: calc(0s + 0.35s * 0.3);
  }

  .bar--bottom {
    top: calc(50% + 11px + 4px / 2);
    transition-property: top, transform;
    transition-delay: 0s;
  }

  #checkbox:checked + .toggle .bar--top {
    transform: rotate(-135deg);
    transition-delay: 0s;
    bottom: calc(50% - 4px / 2);
  }

  #checkbox:checked + .toggle .bar--middle {
    opacity: 0;
    transform: rotate(-135deg);
    transition-delay: calc(0s + 0.35s * 0.3);
  }

  #checkbox:checked + .toggle .bar--bottom {
    top: calc(50% - 4px / 2);
    transform: rotate(-225deg);
    transition-delay: calc(0s + 0.35s * 0.6);
  }
`;
