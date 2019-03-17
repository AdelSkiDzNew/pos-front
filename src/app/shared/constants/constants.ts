export enum Constant{
    /**
     * URL SERVICE WEB
     */
    baseUrl = '/api/v1',
    oauth = '/oauth/token',
    currentUser = '/getCurrentUser',
    getAllCategoriesByUser = '/categorie/findAll/User',
    saveOrUpdateProfile = '/profile/saveOrUpdate',
    saveOrUpdateImageProfile = '/profile/saveOrUpdatePicture',
    getProfileCurrentUser = '/profile/getProfileByUser',
    saveOrUpdateProduit='/produit/ajouterProduit',
    uplodeFileProduit = '/produit/telecharger',
    getAllProduitByUser = '/produit/getAllProduitByUser',
    serverUrlSocket = '/socket',
    getNextTicketForToDayAndUser = '/ticket/nextTicketForToDayAndUser',
    saveOrUpdateCommande = '/commande/saveOrUpdateCommande',
    


    /**profile by Defeault */
    userName="Adel",adresse="Cité du 20 août 1955",profession="développeur",nomRestaurant='مطعم زعيم الشام',
    statutEncoursDePreparation='En cours de préparation',statutTerminé = 'Préparation Terminée'
}