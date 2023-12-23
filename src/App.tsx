import { Formik, Form, Field, FieldArray } from 'formik';

// We're using an empty person as default.
const emptyPerson = {
  first: "",
  last: "",
  age: 21
}

// If you want people added by default, you can use something like below as the initialization value of `people`.
/*
const startingPeople = [{
  first: "First Name",
  last: "Last Name",
  age: 26
}, {
  first: "First Name #2",
  last: "Last Name #2",
  age: 21
}]
*/

function App() {
  return (
    <Formik
      initialValues={{
        //people: startingPeople
        people: [emptyPerson]
      }}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {(form) => (
        <Form>
          <h1>People</h1>
          <FieldArray name="people">
            {({ push, remove }) => (
              <>
                {form.values.people.map((_person, index) => {
                  // To simplify code, let's build the starting string of our field names for this specific person which is `people[index]`.
                  const startName = `people[${index.toString()}]`

                  return (
                    <div key={`person-${index.toString()}`}>
                      <h2>Person #{(index + 1).toString()}</h2>
                      <div>
                        <label htmlFor={`${startName}.first`}>First Name</label>
                        <Field name={`${startName}.first`} />
                      </div>
                      <div>
                        <label htmlFor={`${startName}.last`}>Last Name</label>
                        <Field
                        name={`${startName}.last`}
                        />
                      </div>
                      <div>
                        <label htmlFor={`${startName}.age`}>Age</label>
                        <Field
                          type="number"
                          name={`${startName}.age`}
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                        >Remove</button>
                      </div>
                    </div>
                  )
                })}
                <div>
                  <button
                    type="button"
                    onClick={() => push(emptyPerson)}
                  >Add Person</button>
                </div>
              </>
            )}
          </FieldArray>
          <div>
            <button type="submit">Add People!</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default App;
