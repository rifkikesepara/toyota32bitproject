# **_Components_**

## Countdown

This component provides you to add timer to the page

**PROPS**
|name|type|Description|
|--|--|--|
|time |_number_ |`It defines the time that the timer will start from`|
|onTimesUp|function(_remainingTime_)|`It provides you the remaining time with a function`|
|size|_number_|`It defines the font size of the timer`|

## CustomMenu

This component is the customized version of [Menu](https://mui.com/material-ui/api/menu/) component of Material UI. Scroll UP and DOWN buttons have been added.

**PROPS**
|name|type|Description|
|--|--|--|
|open|_bool_ |`If it is true the component is shown.`|
|anchorEl|_HTML element/function_|`  An HTML element, or a function that returns one. It's used to set the position of the menu.`|
|onClose|_function_|`Callback fired when the component requests to be closed.`|
|data|_object_|The data for the menu items that will be shown in the menu window. Data object must be like this: `{defectName: label of the menu item, defectId: value of the menu item}`|
|onClick|function(defectID)| `The function that gives you to the value of clicked menu item`|

## CustomSelect

This component is the customized verison of [Select](https://mui.com/material-ui/api/select/) component of Material UI. Scroll UP and DOWN buttons have been added.

**PROPS**
|name|type|Description|
|--|--|--|
|open|_bool_ |`If it is true the component is shown.`|
|count|_number_|`Defines the number of menu item that will be shown on select window`|
|sx|_object_|`The system prop that allows defining system overrides as well as additional CSS styles.`|
|disabled|_bool_|`Defines whether the component will be shown or not.`|
|name|_string_|`Defines the value name to store the in the form.`|
|value|_object_|`Helps to change the value in the form.`|
|onChange|_function_|`The function executes whenever the selected menu item changes.`|
|onClose|_function_|`Callback fired when the component requests to be closed.`|
|data|_object_|The data for the menu items that will be shown in the menu window. Data object must be like this: `{termName: label of the menu item, termId: value of the menu item}`|

## CustomTextField

This component is the customized verison of [TextField](https://mui.com/material-ui/api/text-field/) component of the Material UI. Virtual Keyboard has been combined with this input component.

**PROPS**
|name|type|Description|
|--|--|--|
|setValues|_function({...values,[name]:inputVal})_ |`The function that provides the input value.`|
|values|_object_|`Helps to change the relevant value in the form.`|
|onChange|_function({[name]:inputVal})_|`The function that provides the input value as an object whenever the input changes.`|
|className|_string_|`Changes the component's CSS class name.`|
|id|_string_|`Changes the id value of TextField component.`|
|style|_object_|`Changes the CSS style of div that contains TextField.`|
|width|_number_|`Defines the width of div that contains TextField.`|
|sx|_object_|`Changes the style of TextField component`|
|placeholder|_string_|`Defines the placeholder of the input`|
|error|_bool_|`Defines whether the label will be displayed in an error state or not.`|
|helperText|_string_|`The helper text content.`|
|disabled|_bool_|`Defines whether the component will be shown or not.`|
|autoComplete|_bool_|`Enables auto complete mode`|
|name|_string_|`Defines the value name to store the in the form.`|
|value|_object_|`Defines the value of input.`|
|iconPosition|'left', 'right', 'leftInner', 'rightInner'| `Defines the location of the icon on the TextField to open the virtual keyboard.`|
|onClose|_function_|`The function that is executed whenever the virtual keyboard is closed.`|
|keyboardSX|_object_|`Defines the style of the virtual keyboard.`|
|keyboardLayout|_'numeric', 'normal'_|`Defines the layout of the virtual keyboard.`|
|keyboardWidth|_number_|`Defines the width of the virtual keyboard.`|

## DefectEntryImage

This component is used for drawing boxes where the car parts are and selecting the specific defect.

**PROPS**
|name|type|Description|
|--|--|--|
|setPicture|_function_|`Sets the id of picture that is shown on the background.`|
|setData|_function_|`Sets the data that defines location of the car parts.`|
|data|_object_|`The data that defines the location of the car parts.`|
|setSelectedDefect|_function_|`The function that sets the value of the selected defect.`|
|img|_element_|`Sets the image of the background.`|

## ErrorLog

This component is used for logging the defect into the database whenever it's selected

**PROPS**
|name|type|Description|
|--|--|--|
|isSaved|_function_|`Gives a bool that indicates whether the error is logged or not.`|
|openFunc|_function_|`Returns false whenever user clicks outside of the dialog window or closes the dialog window.`|
|open|_bool_|`If it is true the component is shown.`|

## VirtualKeyboard

The component that renders a virtual keyboard onto the screen.

**PROPS**
|name|type|Description|
|--|--|--|
|layout|_string ('numeric', 'normal')_|`Indicates the layout of the virtual keyboard.`|
|onChange|_function(input)_|`The function that is executed whenever the user clicks a button on the virtual keyboard and gives you the current input that has been written on the virtual keyboard.`|
|setValues|_function({...values,[name]:inputVal})_ |`The function that provides the input value.`|
|values|_object_|`Helps to change the relevant value in the form.`|
|inputName|_string_|`Defines the value name to store the in the form.`|
|keyboard|_ref_|`Returns the reference of the virtual keyboard.`|
|inputRef|_ref_|`Returns the reference of the value that has been written in virtual keyboard.`|
|style|_object_|`Defines the style of the div that contains the virtual keyboard.`|
|onBlur|_function_|`The function that is executed whenever user clicks outside of the virtual keyboard.`|
|width|_number_|`Defines the width of the virtual keyboard.`|

## VirtualTable

This component is used for rending the data that contains almost over 1000 object, into the table. And manuplating the data.

**PROPS**
|name|type|Description|
|--|--|--|
|data|_object_|`The data that used in the table's row.`|
|isFiltered|_function(bool)_|`The function that returns true if a filtering is applied to data.`|
|setValues|_function({...values,[name]:inputVal})_ |`The function that provides the input value.`|
|columns|_object_|Defines the columns of the table. Data should in this format: `[{width:"x%",label:"name",dataKey:"value",numeric:false}]`|
|filterWord|_object_|Provides you to filter data outside of the component. Object should be like this: `{..., "filterWord":"value"}`|
|height|_number_|`Defines the height of the table.`|
|setScrollerRef|_function(ref)_|The function that sets the reference of the table's scroller|
|style|_object_|`Defines the style of the table.`|
|isRefreshed|_function_|`Returns true if the user clicks the refresh button on the table.`

---

# Custom Hooks

### \*useGetData

This hook is used for fetching data from an api at certain time intervals. With using this hook you can manuplate the data that you fetched from the api, with passing a function in it. You can change the fetching time so data will be fetched slower or faster by whatever time you changed. Returns the fetched data.

    useGetData(url: string, timeout: number, then: function)

---

### \*useGetDataOnce

This hook is used for fetching data for once depending on the value that you give the hook. With using this hook you can manuplate the data that you fetched from the api, with passing a function in it. You can change the dependency value so that data will be fetched one more time. Return the fetched data.

    useGetDataOnce(url: string, dependency: any, then: function)

---

### \*useAlert

This hook gives you the ability to access the alert component's context so that you can manipulate variables of alert such as messeage type **(success, error)** , alert message, alert duration and the thing that you want to do after alert is finished

    const{setAlert} = useAlert();
    setAlert(message: string, type: string, duration: number, onFinish: function);
