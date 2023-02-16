# Simple-RESTful-API
This is  simple RESTful API that provides data when queried using Express and Javascript

## Requirements ##

User story: as a nurse practitioner I want to be able to view a list of observations for a patient

- The API should be able to retrieve patient(s) using NHS number or surname
- The API should be able to retrieve all observations for a patient ID

**Notes**

- Sample data included are [FHIR](http://hl7.org/fhir/) resources (a standard for health care data exchange)
  - [Patient](http://www.hl7.org/implement/standards/fhir/patient.html)
  - [Observation](http://www.hl7.org/implement/standards/fhir/observation.html)
- Ideally requests should follow FHIR [Search](http://hl7.org/fhir/http.html#search) requirements and the response should be a FHIR [Bundle](http://hl7.org/fhir/bundle.html) resource, but this is not a requirement of this task
- The `subject` property in the Observation resource is a reference to the Patient resource `id`
- Acceptance testing could be via Postman, simple curl commands or any approach that suits you.
- Please complete this task to the standard that you set for real work destined for a production environment.
- Share the code however is easiest for you (zip file, link to a repo, etc)

## Prerequisites ##
Ensure that you have Node.js and Postman installed on your machine.

I used the node:FS module to interact with the file system. 

## Testing ##

Use Postman and the following GET requests to test the api:

- http://localhost:8080/getPatient/smith //This should return the patient records with a Family Name of Smith.
- http://localhost:8080/getPatient/Jones //This should return "No Data Found" as the patient does not exist.
- http://localhost:8080/getPatient/1111111111 //This should return the patient records with an NHS number of 1111111111.
- http://localhost:8080/getPatient/1111111112 //This should return the patient records with an NHS number of 1111111112.
- http://localhost:8080/getPatient/1111111113 //This should return "No Data Found" as the patient does not exist.
- http://localhost:8080/getObservations/1 //This should return the observations for Patient/1
- http://localhost:8080/getObservations/2 //This should return the observations for Patient/2
- http://localhost:8080/getObservations/3 //This should return "No Data Found" as patient observations do not exist. 

