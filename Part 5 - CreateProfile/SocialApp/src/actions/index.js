/*
The usual way of importing/exporting modules is requires the use of the module's
specific path
i.e. export <MODULE> || import <MODULE> from './<PATH>/<FILE_NAME>'

As such, having multiple actions/reducers that are used more than once will require
you to type './<PATH>/<FILE_NAME>' multiple times for each and every module. This
opens up more room for typo errors and inconvenience.

Instead, we will make use of this index.js file to channel all the actions together,
as if they were written in this file. The result is as follows:

-- index.js --
export * from './<PATH>/<FILE_NAME>' ## for each file

-- <COMPONENT>.js --
import { <MODULE_1>, <MODULE_2>, <MODULE_3> } from '../actions/index.js' <- never changes

Simply put, do it once well in index.js and you will never need to bother with
paths when importing numerous modules in component files again.
*/

export * from './auth';
