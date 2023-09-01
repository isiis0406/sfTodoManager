import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import updateContacts from '@salesforce/apex/ContactController.updateContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactMassEditDataTable extends LightningElement {
    @track contacts = [];
    @track error;
    @track refreshTable = false;
    columns = [
        { label: 'Nom', fieldName: 'LastName', editable: true },
        { label: 'Prénom', fieldName: 'FirstName', editable: true },
        { label: 'Téléphone', fieldName: 'Phone', type: 'phone', editable: true },
        { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    ];
    @track draftValues = [];

    @wire(getContacts)
    wiredContacts(result) {
        this.wiredContacts = result;
        if (result.data) {
            this.contacts = result.data;
            this.error = undefined;
            console.log('Données récupérées avec succès : ',);
        } else if (result.error) {
            this.error = result.error;
            this.contacts = undefined;
            console.error('Erreur lors de la récupération des données : ', this.error);
        }

        
    }

    renderedCallback() {
        const dataTable = this.template.querySelector('[data-id="my-datatable"]');
        if (dataTable) {
            dataTable.addEventListener('save', this.handleSaveChanges.bind(this));
        }
    }

    handleSaveChanges(e) {
        const updatedField = e.detail.draftValues;
        console.log('updatedField :', JSON.stringify(updatedField));
        // Appelez la méthode Apex pour mettre à jour les contacts
        updateContacts({ contactsToUpdate: updatedField })
            .then((result) => {
                //console.log('Résultat de la mise à jour :', result);
                if (result === 'Mise à jour des contacts réussie.') {
                    
                    // Déclenchez la mise à jour du composant
                    this.refresh();
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Succès',
                            message: result,
                            variant: 'success'
                        })
                    );
                    this.draftValues = [];
                } else {
                    console.error(result);
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour :', error);
            });
         
    }
    async refresh(){
        await refreshApex(this.wiredContacts); 
              
    }
}
