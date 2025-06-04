import React, { useState, useEffect } from "react";
import { Etablissement } from "../../models/etablissement";

interface Props {
  etablissements: Etablissement[]; // liste complète déjà chargée
  onSelect: (etablissement: Etablissement) => void;
}

export function EtablissementSelector({ etablissements, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<Etablissement[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setFilteredResults([]);
      setShowResults(false);
      return;
    }

    const filtered = etablissements.filter((etab) =>
      etab.nom.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredResults(filtered);
    setShowResults(true);
  }, [query, etablissements]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-semibold text-sm text-gray-700">Établissement</label>
      <input
        type="text"
        className="border border-gray-300 px-3 py-2 rounded-md"
        placeholder="Tapez le nom de l’établissement"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {showResults && filteredResults.length > 0 && (
        <ul className="border border-gray-200 rounded-md max-h-48 overflow-y-auto bg-white shadow-sm">
          {filteredResults.map((etab) => (
            <li
              key={etab.idEtablissement}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onSelect(etab);
                setQuery(etab.nom);
                setShowResults(false);
              }}
            >
              {etab.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
