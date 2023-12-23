**WIP**

In this guide, we'll be going over how to setup a form with dynamic fields using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)/JavaScript, and [Formik](https://formik.org/).

The form in this guide will represent a list of people. Each person will have first name, last name, and age fields. You will be able to add another person to the list by clicking the **Add Person** button and remove a specific person by clicking the **Remove** button underneath the fields for that specific person.

We will *NOT* adding any styling to our form using CSS as well! This is to simplify the guide.

## My Development Setup
Before continuing, I just wanted to briefly go over my development setup.

I am writing this guide and developing the React application using [Visual Studio Code](https://code.visualstudio.com/) as my IDE with the [Remote SSH](https://code.visualstudio.com/docs/remote/ssh) extension that allows me to write/execute code on my VM running Debian 12 (Linux) directly. The VM is located on one of my home servers I have running locally under its own VLAN.

The VM is running Node.js version `20.10.0` with NPM version `10.2.4`. It also has 6 GBs of DDR4 RAM and two vCPU cores.

![Dev Setup Image](https://raw.githubusercontent.com/deaconn-net/react-form-with-dynamic-fields-and-formik/images/devsetup.png)

## Prerequisites
React, TypeScript, and Formik are required for this guide. We will also be using Node.js with its package manager, NPM.

### Installing Node.js & NPM
On Debian/Ubuntu-based systems, you may install the `nodejs` and `npm` packages using the `apt` package manager. The following command should do the trick.

```bash
sudo apt install -y nodejs npm
```

However, this will most likely install an outdated/stable version of Node.js. While the stable version of Node should work fine for this guide, if you want to install a more up-to-date version of Node.js, feel free to take a look at [this guide](https://github.com/nodesource/distributions?tab=readme-ov-file#nodejs)! Additionally, you may read [this guide](https://nodejs.org/en/download/package-manager#debian-and-ubuntu-based-linux-distributions) if you want to install Node.js and NPM on a Linux OS other than Debian/Ubuntu.

For Windows builds, you may refer to the download page [here](https://nodejs.org/en/download).

### Creating A React Application
You can create a React application using `npx` after installing Node.js and NPM above.

```bash
npx create-react-app <name> --template typescript
```

If you plan on using TypeScript, make sure to pass `--template typescript`. Otherwise, you may omit this flag to use JavaScript.

### Installing Formik
To install Formik, you may use the following `npm` command.

```bash
npm install --save formik
```

### NPM Audit
Before continuing, you may also want to perform an audit using `npm` to ensure there aren't any vulnerabilities in our installed packages. You may use the following command to do so.

```bash
# Perform an audit and receive a vulnerabilities report.
npm audit

# Attempt to update packages to resolve vulnerabilities.
npm audit fix
```

## Making Our Form
We will be creating our React form inside of the `src/App.tsx` file (or `src/App.jsx` if you're using JavaScript).

### Import Elements From Formik & Cleaning Imports
We want to import elements we'll be using from Formik. With that said, I've cleaned up other imports we won't need such as the logo and CSS file.

We will import `Formik`, `Form`, `Field`, and `FieldArray` from the Formik package.

```ts
import { Formik, Form, Field, FieldArray } from 'formik';
```

### Initializing An Empty Person Value
Next, we'll want to create an empty person object that represents the default values of a person. In this case, the first and last names will be an empty string while we'll use a default age of `21`.

```ts
const emptyPerson = {
    first: "",
    last: "",
    age: 21
}
```

At this point, our code above the `App()` function should look something like this:

```ts
import { Formik, Form, Field, FieldArray } from 'formik';

const emptyPerson = {
  first: "",
  last: "",
  age: 21
}
```

### Creating The Base Form
Inside of our `App()` function, we can create a simple form using the `<Formik>` along with `<Form>` elements. We'll need to pass two props to the `<Formik>` element. The first prop is our initial values and the second prop is an on submit callback function.

In this guide, our on submit callback function will simply print all values to the client's console using `console.log()` when the **Add People** button is clicked. Our initial values will consist of a `people` array which is set to the a single `emptyPerson` object we made above.

```ts
function App() {
    return (
        <Formik
            initialValues={{
                people: [emptyPerson]
            }}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {(form) => (
                <Form>
                    <h1>People</h1>
                    ...
                    <div>
                        <button type="submit">Add People!</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
```

### Creating 
