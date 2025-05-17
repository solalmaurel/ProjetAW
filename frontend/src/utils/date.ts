const formatDate = (dateInput: string | Date | undefined | null): string => {
    if (!dateInput) return "N/A";
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            console.warn("Date invalide :", dateInput);
            return "Date invalide";
        }
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Erreur de format de date";
    }
};

export { formatDate };