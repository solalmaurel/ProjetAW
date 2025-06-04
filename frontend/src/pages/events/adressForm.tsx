// AdresseForm.tsx
import React from 'react';
import { Adresse } from '../../models/adresse';

interface AdresseFormProps {
  newAdresse: Adresse;
  setNewAdress: React.Dispatch<React.SetStateAction<Adresse>>;
  handleSubmitAdress: (e: React.FormEvent) => void;
  setShowAdresseForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdresseForm: React.FC<AdresseFormProps> = ({
  newAdresse,
  setNewAdress,
  handleSubmitAdress,
  setShowAdresseForm
}) => {

  const handleInputChangeAdress = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAdress({
      ...newAdresse,
      [name]: value,
    });
  };

  return (
    <form className="w-5/6 p-5 border border-1 rounded-lg" onSubmit={handleSubmitAdress}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Numéro</label>
        <input
          type="text"
          name="numero"
          value={newAdresse.numero}
          onChange={handleInputChangeAdress}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Complément</label>
        <input
          type="text"
          name="complement"
          value={newAdresse.complement}
          onChange={handleInputChangeAdress}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Rue</label>
        <input
          type="text"
          name="rue"
          value={newAdresse.rue}
          onChange={handleInputChangeAdress}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Code Postal</label>
        <input
          type="text"
          name="codePostal"
          value={newAdresse.codePostal}
          onChange={handleInputChangeAdress}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ville</label>
        <input
          type="text"
          name="ville"
          value={newAdresse.ville}
          onChange={handleInputChangeAdress}
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => setShowAdresseForm(false)}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
