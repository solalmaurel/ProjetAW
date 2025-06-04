import React from 'react';

// Définir les types pour les props
interface Etablissement {
  nom: string;
  idEtablissement: number | null;
}

interface EtablissementFormProps {
  newEtablissement: Etablissement;
  setNewEtablissement: React.Dispatch<React.SetStateAction<Etablissement>>;
  handleSubmitEtablissement: (e: React.FormEvent) => void;
  setShowEtablissementForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EtablissementForm: React.FC<EtablissementFormProps> = ({
  newEtablissement,
  setNewEtablissement,
  handleSubmitEtablissement,
  setShowEtablissementForm
}) => {
  return (
    <div onSubmit={handleSubmitEtablissement} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nom de l'établissement
        </label>
        <input
          type="text"
          name="nom"
          value={newEtablissement.nom || ''}
          onChange={(e) => setNewEtablissement({ ...newEtablissement, nom: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Créer
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowEtablissementForm(false)}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};
