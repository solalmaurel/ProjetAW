package fr.n7.entraide.entities;
public enum TypeEtude {
    Informatique(0),
    Maths(1),
    Mecanique(2),
    Physique(3),
    Chimie(4),
    Biologie(5),
    SciencesDeLaTerre(6),
    Economie(7),
    Gestion(8),
    Litterature(9),
    Droit(10),
    Medecine(11),
    Pharmacie(12),
    SciencesPolitiques(13),
    Sociologie(14),
    Psychologie(15);

    private final int numero;

    TypeEtude(int numero) {
        this.numero = numero;
    }

    public int getNumero() {
        return numero;
    }
}
