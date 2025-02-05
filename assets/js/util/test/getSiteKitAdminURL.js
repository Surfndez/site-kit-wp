/**
 * Internal dependencies
 */
import { getSiteKitAdminURL } from '../';

const valuesToTest = [
	[
		'googlesitekit-dashboard',
		{
			foo: 'bar',
		},
		'http://example.com/wp-admin/admin.php?page=googlesitekit-dashboard&foo=bar',
	],
	[
		'googlesitekit-dashboard',
		{
			foo: 'bar',
		},
		'http://example.com/wp-admin/admin.php?page=googlesitekit-dashboard&foo=bar',
	],
	[
		'googlesitekit-dashboard',
		{
			foo: 'bar',
			x: 1,
		},
		'http://example.com/wp-admin/admin.php?page=googlesitekit-dashboard&foo=bar&x=1',
	],
	[
		'googlesitekit-search-console',
		{
			foo: 'bar',
		},
		'http://example.com/wp-admin/admin.php?page=googlesitekit-search-console&foo=bar',
	],
	[
		'googlesitekit-dashboard',
		{
			bar: 'foo',
		},
		'http://example.com/wp-admin/admin.php?page=googlesitekit-dashboard&bar=foo',
	],
	[
		undefined,
		{},
		'http://example.com/wp-admin/admin.php?page=googlesitekit-dashboard',
	],
];

describe( 'getSiteKitAdminURL', () => {
	it.each( valuesToTest )( 'for page %s and args %p should return %s', ( page, args, expected ) => {
		expect( getSiteKitAdminURL( page, args ) ).toStrictEqual( expected );
	} );
} );
