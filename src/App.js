
import { Formik, Field, useField, FieldArray } from 'formik';
import { TextField, Button, Checkbox, Radio, FormControlLabel, MenuItem, Select } from '@material-ui/core';
import * as yup from 'yup';



const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  
  return(
    <FormControlLabel 
      {...field}
      value={field.value} 
      control={<Radio />} 
      label={label} 
    />
  )
}

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : '';
  return(
    <TextField {...field}  placeholder={placeholder} helperText={errorText} error={!!errorText} />
  )
}

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  lastName: yup.string().required().max(10),
  pets: yup.array().of(yup.object({
    name: yup.string().required()
  }))
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <main>
        <Formik 
          initialValues={{ 
            firstName: '', 
            lastName: '', 
            isTall: false, 
            cookies: [],
            yoghurt: '',
            pets: [{ type: 'cat', name: 'jarvis', id: '' + Math.random() }]
          }}
          // validate={(values) => {
          //   const errors = {};
          //   if(values.firstName.includes('bob')) {
          //     errors.firstName = 'no bob';
          //   }
          //   return errors;
          // }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log('submit:', data);
            setSubmitting(false);
        }}>
          {({ values, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => 
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MyTextField 
                placeholder='first name' 
                name='firstName' 
                type='input' 
                as={TextField} 
              />
              <MyTextField 
                placeholder='last name' 
                name='lastName' 
                type='input' 
                as={TextField} 
              />
              <Field name='isTall' type='checkbox' as={Checkbox} />
              <div>
                cookies:
                <Field 
                  name='cookies' 
                  type='checkbox' 
                  as={Checkbox} 
                  value='chocolate' 
                />
                <Field 
                  name='cookies' 
                  type='checkbox' 
                  as={Checkbox} 
                  value='walnut' 
                />
                <Field 
                  name='cookies' 
                  type='checkbox' 
                  as={Checkbox} 
                  value='macademia' 
                />
              </div>
              <div>
                yoghurt:
                <MyRadio 
                  label='blueberry'
                  name='yoghurt'
                  value='blueberry'
                  type='radio'
                />
                <MyRadio 
                  label='apple'
                  name='yoghurt'
                  value='apple'
                  type='radio'
                />
                <MyRadio 
                  label='peach'
                  name='yoghurt'
                  value='peach'
                  type='radio'
                />
                
              </div>
              <FieldArray name='pets'>
                {(arrayHelpers) => (
                  <div>
                    <Button onClick={() => arrayHelpers.push({
                      type: '',
                      name: '',
                      id: '' + Math.random()
                    })}>Add pet</Button>
                    {values.pets.map((pet, index) => {
                      return(
                        <div key={pet.id}>
                          <MyTextField 
                            placeholder='pet name' 
                            name={`pets.${index}.name`}
                          />
                          <Field 
                            name={`pets.${index}.type`} 
                            type='select' 
                            as={Select} 
                          >
                            <MenuItem value='cat'>Cat</MenuItem>
                            <MenuItem value='dog'>Dog</MenuItem>
                            <MenuItem value='frog'>Frog</MenuItem>
                          </Field>
                            <Button onClick={() => arrayHelpers.remove(index)}>X</Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </FieldArray>
                <Button 
                  type='submit'
                  disabled={isSubmitting}
                >submit</Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </form>
          }
        </Formik>
      </main>
    </div>
  );
}

export default App;
