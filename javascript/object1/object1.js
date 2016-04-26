/*We have our address book in the contacts array, but what if we make a new friend and want to add them as well?

Objects, just like other types of data, can be put into arrays with a array[position] = object statement. To append something to the end of the array, you need to put it in the position one after the last item.

Since arrays are numbered starting at zero, the number of the last item in the array will be one less than the quantity of items in the array. The size of the array is thus the position to insert at.

The length of an array, like the length of a string, can be found with array.length.
We can do the insert in a succinct way by adding the new object directly into the array position without even giving it a name. This can be confusing, but we will be able to refer to it by its array position, so it does not need a direct name. Do it like this:

contacts[contacts.length] = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email
};
(Assuming you defined the add function with the parameters firstName, lastName, phoneNumber, and email.)

That will automatically create a new object and add it into the array. Pretty neat.
*/

var bob = {
    firstName: "Bob",
    lastName: "Jones",
    phoneNumber: "(650) 777-7777",
    email: "bob.jones@example.com"
};

var mary = {
    firstName: "Mary",
    lastName: "Johnson",
    phoneNumber: "(650) 888-8888",
    email: "mary.johnson@example.com"
};

var contacts = [bob, mary];

function printPerson(person) {
    console.log(person.firstName + " " + person.lastName);
}

function list() {
	var contactsLength = contacts.length;
	for (var i = 0; i < contactsLength; i++) {
		printPerson(contacts[i]);
	}
}

/*Create a search function
then call it passing "Jones"*/
function search(lastName){
    var contactsLength = contacts.length;
    for (var i = 0; i < contactsLength; i++) {
		if(contacts[i].lastName === lastName)
	        printPerson(contacts[i]);
	}
}

search("Jones");

function add(firstName, lastName, email, phoneNumber){
    var addPerson = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email
    };
    contacts[contacts.length] = addPerson;
}

add("Pooja", "Mehta", "pooja.mehta@example.com", "(650) 888-8888");
list();
