/**
 * DimensionTabs component
 *
 * Site Kit by Google, Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';

/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { CORE_UI } from '../../../../../googlesitekit/datastore/ui/constants';
import {
	DIMENSION_NAME_ALL_TRAFFIC_WIDGET,
	DIMENSION_VALUE_ALL_TRAFFIC_WIDGET,
	DIMENSION_COLOR_ALL_TRAFFIC_WIDGET,
} from '../../../datastore/constants';
import PreviewBlock from '../../../../../components/PreviewBlock';
const { useDispatch } = Data;

export default function DimensionTabs( { dimensionName, loaded } ) {
	const { setValues } = useDispatch( CORE_UI );

	const tabs = [
		{
			tabText: __( 'Channels', 'google-site-kit' ),
			dimensionName: 'ga:channelGrouping',
		},
		{
			tabText: __( 'Locations', 'google-site-kit' ),
			dimensionName: 'ga:country',
		},
		{
			tabText: __( 'Devices', 'google-site-kit' ),
			dimensionName: 'ga:deviceCategory',
		},
	];

	const activeTab = tabs.findIndex( ( v ) => v.dimensionName === dimensionName );

	const handleTabUpdate = useCallback( ( index ) => {
		setValues( {
			[ DIMENSION_NAME_ALL_TRAFFIC_WIDGET ]: tabs[ index ].dimensionName,
			[ DIMENSION_VALUE_ALL_TRAFFIC_WIDGET ]: '',
			[ DIMENSION_COLOR_ALL_TRAFFIC_WIDGET ]: '',
		} );
	} );

	if ( ! loaded ) {
		return (
			<div className="googlesitekit-widget--analyticsAllTraffic__tabs--loading">
				<PreviewBlock width="100px" height="40px" shape="square" />
				<PreviewBlock width="100px" height="40px" shape="square" />
				<PreviewBlock width="100px" height="40px" shape="square" />
			</div>
		);
	}

	return (
		<TabBar
			activeIndex={ activeTab }
			handleActiveIndexUpdate={ handleTabUpdate }
		>
			{
				tabs.map( ( tab ) => (
					<Tab
						key={ tab.dimensionName }
						className="mdc-tab--min-width"
						focusOnActivate={ false }
					>
						<span className="mdc-tab__text-label">{ tab.tabText }</span>
					</Tab>
				) )
			}
		</TabBar>
	);
}

DimensionTabs.propTypes = {
	dimensionName: PropTypes.string.isRequired,
	loaded: PropTypes.bool,
};
