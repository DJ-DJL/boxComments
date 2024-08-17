# boxComments


## Description

Create a javascript block comment

To install the module, use npm:

```bash

npm install @djleehaha/boxComments

```
## Usage

```javascript

import boxComment from '@djleehaha/boxComments';

console.log(boxComment([`first line`, `second line`]));
```
## API

### `boxComment(lines, maxWidth, boxChar, padding)`

Creates a javascript block comment with the provided options

#### Parameters:

* `lines` (string[]): An array of strings representing lines in the boxComment.
                    N.B. do not put newlines in the strings, they will not be handled correctly!
                    use `str.split('\n)` or `['first line', ...str.split('string\nwith\nnewlines')]`
* `maxWidth` (number, optional): The maximum width of the box. Default = `80`
* `boxChar` (string): the character(s) to use for the box. Default = `'*'`
* `padding` (string): Padding to insert between the box and the content. Default = `'  '` (2 spaces).

Returns: javascript block comment as a string

#### Example:

```javascript
const comment = boxComment([`first line`, ...`multi\nline\nstring`.split('\n'), `last line`], 20, `**`, 4);
// outputs:
/*********************
**    first line    **
**    multi         **
**    line          **
**    string        **
**    last line     **
*********************/
```

## Contributing

Please create a pull request for any bugs or enhancements

## License

This project is licensed under the MIT License.
