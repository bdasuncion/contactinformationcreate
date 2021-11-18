import { gql, useMutation } from "@apollo/client";
import client from "../apollo-client";

export async function createContactInformation() {
   
    var contactInformation = {
        name :  JSON.stringify(event.target.name.value), 
        age : event.target.age.value,
        group : JSON.stringify(event.target.group.value), 
        mobile :  JSON.stringify(event.target.mobile.value)
    }

       event.target.name.value = null;
    event.target.age.value = null;
    event.target.group.value = null;
    event.target.mobile.value = null;

    console.log("DDDD", event.target)
    const CREATE_CONTACTINFORMATION = gql`mutation insertOneContactInformation(
        $name: String!,
        $mobile: String!,
        $group: String!,
        $age: Int!,
    ) {
        insertOneContactInformation(data: {name: $name, mobile: $mobile, 
            group: $group, age: $age}) 
            {
                _id
                name
                age
                mobile
                group
            }
        }
    `;

    const { data } = await client.mutate({
        mutation: CREATE_CONTACTINFORMATION,
        variables: contactInformation
    });
  
   // event.target.name.value = null;
   // event.target.age.value = null;
   // event.target.group.value = null;
   // event.target.mobile.value = null;

    return {
      props: {
        contactInformation: data.contactInformation,
      },
   };
  }

export default function Form() {
    const registerUser = event => {
      event.preventDefault() // don't redirect the page
      // where we'll add our form logic
      createContactInformation()
    }
  
    //getServerSideProps()

    return (
      <form onSubmit={registerUser}>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text"  required/>
        </div>
        <div>
            <label htmlFor="name">Age</label>
            <input id="age" type="number" required />
        </div>
        <div>
            <label htmlFor="name">Group</label>
            <input id="group" type="text" required />
        </div>
        <div>
            <label htmlFor="name">Mobile</label>
            <input id="mobile" type="text" required />
        </div>
        <button type="submit">Register</button>
      </form>
    )
  }