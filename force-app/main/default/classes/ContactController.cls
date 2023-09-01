public with sharing class ContactController {

    // Méthode pour mettre à jour les contacts
    @AuraEnabled
    public static String updateContacts(List<Contact> contactsToUpdate) {
        try {
            // Mettez à jour les contacts dans la liste contactsToUpdate
            update contactsToUpdate;

            // Si la mise à jour s'est bien passée, renvoyez un message de succès
            return 'Mise à jour des contacts réussie.';
        } catch (Exception e) {
            // En cas d'erreur, renvoyez un message d'erreur
            return 'Erreur lors de la mise à jour des contacts : ' + e.getMessage();
        }
    }
}
