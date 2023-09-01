import { LightningElement, wire, api } from 'lwc';
import { createRecord, getRecord } from 'lightning/uiRecordApi';
const fieldArray=['Contact.LastName','Contact.Email','Contact.Phone'];

export default class CreateContactLDS2 extends LightningElement {
    contactName;
    contactEmail;
    contactPhone;
    recordId;

    @api avatarUrl = 'https://isiisdev-dev-ed.develop.my.salesforce.com/sfc/p/7R000004OzH8/a/7R00000043yG/MqoixDZocMy3QoC8NBisvPByr9y5bmqbgpI_n0gw5ik';
    markers = [
        {
            location: {
                Latitude: 37.7749,
                Longitude: -122.4194
            },
            title: 'San Francisco'
        },
        {
            location: {
                Latitude: 34.0522,
                Longitude: -118.2437
            },
            title: 'Los Angeles'
        }
    ];

    @wire(getRecord,{
        recordId: '$recordId',
        fields: fieldArray}
        ) contactRecord;

    contactNameChangeHandler(e){
        this.contactName = e.target.value;
    }
    contactEmailChangeHandler(e){
        this.contactEmail = e.target.value;
    }
    contactPhoneChangeHandler(e){
        this.contactPhone = e.target.value;
    }

    createContact(){
        const fields= {
            LastName: this.contactName,
            Email: this.contactEmail,
            Phone: this.contactPhone
        }
        const recordInput={
            apiName: 'Contact',
            fields
        }
        createRecord(recordInput).then(response=>{
            console.log('Contact created successfuly', response.id);
            //Store the created contact id
            this.recordId = response.id;
        }).catch(error=>{
            console.log('Error in creating Contact', error.body.message );
        })
        
    }
    get retContactName(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.LastName.value;
        }
        return undefined;
    }
    get retContactEmail(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Email.value;
        }
        return undefined;

    }
    get retContactPhone(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Phone.value;
        }
        return undefined;

    }
}