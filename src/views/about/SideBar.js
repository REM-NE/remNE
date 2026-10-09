import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { maindata } from "./mapMock";

function SideBar({
  activeState,
  activeStateName,
}) {
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Encontra o estado correto de forma case-insensitive
  useEffect(() => {
    if (activeState) {
      const state = maindata.estados.find(
        (estado) => estado.sigla.toLowerCase() === activeState.toLowerCase()
      );
      setSelectedState(state || null);
    } else {
      setSelectedState(null);
    }
  }, [activeState]);

  // Log de debug adaptado para a nova estrutura
  useEffect(() => {
    if (selectedState) {
      selectedState.instituicoes.forEach((instituicao) => {
        console.log(`Instituição: ${instituicao.nome}`);
        instituicao.membros.forEach((professor) => {
          console.log(`Professor: ${professor.nome}`);
        });
      });
    }
  }, [selectedState]);

  const handleInstitutionClick = (institution) => {
    setSelectedInstitution(institution);
  };

  if (!selectedState) {
    return (
      <aside className="side-bar" aria-live="polite">
        <div className="side-bar__subtitle-state">
          <h2 className="side-bar__title">
            Clique em um dos estados em vermelho
          </h2>
          <p className="side-bar__subtitle-text">
            Nenhum estado foi selecionado.
          </p>
        </div>
      </aside>
    );
  }

  if (selectedInstitution) {
    return (
      <aside className="side-bar" aria-live="polite">
        <div className="side-bar__header">
          <button
            type="button"
            className="side-bar__back"
            onClick={() => setSelectedInstitution(null)}
          >
            ← Voltar para as instituições
          </button>

          <div className="side-bar__institution-header">
            <h2 className="side-bar__title">
              {selectedInstitution.sigla} - {selectedInstitution.nome}
            </h2>
          </div>
        </div>
        <div className="side-bar__professors">
          {selectedInstitution.membros.map((professor, index) => (
            <div
              key={index}
              className="side-bar__professor"
            >
              <div className="side-bar__professor-avatar">
                {professor.url_imagem ? (
                  <img
                    src={professor.url_imagem}
                    alt={professor.nome}
                  />
                ) : (
                  <span>
                    {professor.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 3)}
                  </span>
                )}
              </div>
              <div className="side-bar__professor-info">
                <strong>{professor.nome}</strong>
                <span>{professor.email}</span>
              </div>
              <a
                href={professor.link_lattes}
                target="_blank"
                rel="noopener noreferrer"
                className="side-bar__lattes"
              >
                Currículo Lattes
              </a>
            </div>
          ))}
        </div>
        <hr className="separator" />
      </aside>
    );
  }

  return (
    <aside className="side-bar" aria-live="polite">
      <div className="side-bar__header">
        <div className="title-row">
          <svg
            width="13"
            height="16"
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.73343 14.2006C7.9733 13.1298 11.6656 9.6628 11.6656 6.33383C11.6656 4.91921 11.1038 3.56253 10.1037 2.56224C9.10357 1.56196 7.74715 1 6.3328 1C4.91845 1 3.56203 1.56196 2.56194 2.56224C1.56185 3.56253 1 4.91921 1 6.33383C1 9.6628 4.6923 13.1298 5.93217 14.2006C6.04768 14.2874 6.18828 14.3344 6.3328 14.3344C6.47732 14.3344 6.61792 14.2874 6.73343 14.2006Z"
              stroke="#8B1A1A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="side-bar__title">
            {activeStateName || selectedState.nome}
          </h2>
        </div>

        {selectedState.instituicoes && selectedState.instituicoes.length > 0 && (
          <p className="subtitle">
            {selectedState.instituicoes.length} instituições encontradas.
          </p>
        )}
      </div>
      <ul className="side-bar__list">
        {selectedState.instituicoes.map((instituicao, index) => (
          <li
            key={instituicao.nome + index}
            className="side-bar__item-wrap"
          >
            <button
              type="button"
              className="side-bar__item"
              onClick={() => handleInstitutionClick(instituicao)}
            >
              <span className="side-bar__item-copy side-bar__subtitle-text">
                <strong>
                  {instituicao.sigla} - {instituicao.nome}
                </strong>
              </span>

              <span
                className="side-bar__item-arrow"
                aria-hidden="true"
              >
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>
      <hr className="separator" />
    </aside>
  );
}

export default SideBar;