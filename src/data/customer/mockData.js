import camelize from 'camelize';
import _ from 'lodash';

export const mockData = {
  orders: {
    activeStatusCounts: {
      "Dispatching jobs": 3,
      "Jobs en-route": 4,
      "Requiring attention": 5,
      "Delayed Jobs": 6
    },
    data: {
      'Dispatching jobs': [
        {
          "id": 12345601,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Dispatching jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3363055691715455,
            "longitude": 103.8253927230835
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345602,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Dispatching jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.2943454226422724,
            "longitude": 103.84303092956543
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345603,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Dispatching jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3051573068444762,
            "longitude": 103.77848625183105
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345604,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Dispatching jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3230912025594925,
            "longitude": 103.73612880706787
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345605,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Dispatching jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.33746396806039,
            "longitude": 103.73600006103516
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        }
      ],
      'Jobs en-route': [
        {
          "id": 12345608,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Jobs en-route",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3210318143922086,
            "longitude": 103.6490535736084
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345606,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Jobs en-route",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3177711129707679,
            "longitude": 103.70419979095459
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345607,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Jobs en-route",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.316269472722038,
            "longitude": 103.68334293365479
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 12345609,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Jobs en-route",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1222.3343,
            "longitude": 2444.223
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 123456010,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Jobs en-route",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.2814740718519217,
            "longitude": 103.62051486968994
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 123456011,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Jobs en-route",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3481040507348487,
            "longitude": 103.82389068603516
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        }
      ],
      'Requiring attention': [
        {
          "id": 123456012,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Requiring Attention",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.2782562240223145,
            "longitude": 103.67222785949707
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 123456013,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Requiring Attention",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3058866783157645,
            "longitude": 103.87985229492188
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 123456014,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Requiring Attention",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3649221509479303,
            "longitude": 103.84552001953125
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 123456015,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Requiring Attention",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3319722944135324,
            "longitude": 103.963623046875
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        }
      ],
      'Delayed Jobs': [
        {
          "id": 123456016,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Delayed Jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.3813969105879216,
            "longitude": 103.8427734375
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        },
        {
          "id": 123456017,
          "pickup_date": "2017-10-23",
          "date_time_started": "0000-00-00 00:00:00",
          "date_time_finished": "0000-00-00 00:00:00",
          "Orders_status_Id": 9,
          "ordersStatusName": "Delayed Jobs",
          "type_id": 1,
          "details_id": 53481,
          "driver_id": 10157,
          "user_id": 23031,
          "location": {
            "latitude": 1.2949031797043358,
            "longitude": 103.81256103515625
          },
          "Orders_products_types_Id": 3,
          "created_at": "2017-10-23 01:52:02"
        }
      ]
    }
  },
  drivers: {
      stats: {
        'In-house': '7',
        'Public': '13',
        'Service Providers': '8',
        'Total': '150'
      },
      activeStatusCounts: {
        'Active drivers': 7,
        'With route': 4,
        'Idle drivers': 5,
        'Inactive drivers': 9
      },
      data: {
        "In-house": {
          'Active drivers': [
            {
              "id": 987601,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3711001991132212,
                "longitude": 103.897705078125
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 987602,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3360910507988213,
                "longitude": 103.68896484375
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 987603,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.341239486566936,
                "longitude": 103.93821716308594
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ],
          'With route': [
            {
              "id": 987604,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 4,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3134378057934368,
                "longitude": 103.91590118408203
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 987605,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 4,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3154972002419345,
                "longitude": 103.81256103515625
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ],
          'Idle drivers': [
            {
              "id": 987606,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 5,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.316870128930104,
                "longitude": 103.9031982421875
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 987607,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 5,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.2935302390231982,
                "longitude": 103.82354736328125
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ],
          'Inactive drivers': [
            {
              "id": 987608,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 3,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3539389150639312,
                "longitude": 103.75625610351562
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 987609,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 3,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3058866783157645,
                "longitude": 103.809814453125
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 9876010,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 3,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.4424898029308453,
                "longitude": 103.79539489746094
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ]
        },
        "Public": {
          'Active drivers': [
            {
              "id": 9876011,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3141242707983072,
                "longitude": 103.8156509399414
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 9876012,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.41743504716723,
                "longitude": 103.7493896484375
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 9876013,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.33883688455388,
                "longitude": 103.68759155273438
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            ,
            {
              "id": 9876014,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3556550489612673,
                "longitude": 103.80500793457031
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 9876015,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 2,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3182430568620136,
                "longitude": 103.77960205078125
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ],
          "With route": [
            {
              "id": 9876015,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 4,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.37521888903652,
                "longitude": 103.86199951171875
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 9876016,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 4,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.38174013353709,
                "longitude": 103.7552261352539
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ],
          'Idle drivers': [
            {
              "id": 9876016,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 5,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3913503559342686,
                "longitude": 103.81685256958008
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            },
            {
              "id": 9876017,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 5,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.3704137501031441,
                "longitude": 103.76827239990234
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ],
          'Inactive drivers': [
            {
              "id": 9876018,
              "resourcesStatusName": "In House",
              "Drivers_status_Id": 3,
              "Drivers_products_types_Id": null,
              "status_name": "active",
              "product_name": null,
              "Vehicle_type_Id": null,
              "vehicle_model": null,
              "vehicle_brand": null,
              "vehicle_license_plate": null,
              "vehicle_model_year": null,
              "vehicle_type": null,
              "first_name": "Dede",
              "last_name": "Driver",
              "email": "driver@carpal.me",
              "phone": "+6587495944",
              "location": {
                "latitude": 1.394096126582873,
                "longitude": 103.76810073852539
              },
              "product_types": [
                {
                  "id": 3,
                  "name": "CarPal Fleet"
                }
              ],
              "transaction_groups": [
                {
                  "id": 123,
                  "name": "Dede Fleet Customer"
                }
              ]
            }
          ]
        },
        "Service Providers": {
        'Active drivers': [
          {
            "id": 9876019,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 2,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3711001991132212,
              "longitude": 103.76955986022949
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876020,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 2,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.4003599038797578,
              "longitude": 103.77728462219238
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876021,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 2,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3953403028541196,
              "longitude": 103.76840114593506
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876022,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 2,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.4332230073518357,
              "longitude": 103.78990173339844
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876023,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 2,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3062299118760903,
              "longitude": 103.85066986083984
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876024,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 2,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3003949349844803,
              "longitude": 103.7933349609375
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          }
        ],
        "With route": [
          {
            "id": 9876025,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 4,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3134378057934368,
              "longitude": 103.91590118408203
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876026,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 4,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3154972002419345,
              "longitude": 103.81256103515625
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876027,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 4,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3395233425123458,
              "longitude": 103.78423690795898
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          }
        ],
        'Idle drivers': [
          {
            "id": 9876028,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 5,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.4074817125203685,
              "longitude": 103.75282287597656
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          },
          {
            "id": 9876029,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 5,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3539389150639312,
              "longitude": 103.93341064453125
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          }
        ],
        'Inactive drivers': [
          {
            "id": 9876030,
            "resourcesStatusName": "In House",
            "Drivers_status_Id": 9,
            "Drivers_products_types_Id": null,
            "status_name": "active",
            "product_name": null,
            "Vehicle_type_Id": null,
            "vehicle_model": null,
            "vehicle_brand": null,
            "vehicle_license_plate": null,
            "vehicle_model_year": null,
            "vehicle_type": null,
            "first_name": "Dede",
            "last_name": "Driver",
            "email": "driver@carpal.me",
            "phone": "+6587495944",
            "location": {
              "latitude": 1.3594305392513826,
              "longitude": 103.75007629394531
            },
            "product_types": [
              {
                "id": 3,
                "name": "CarPal Fleet"
              }
            ],
            "transaction_groups": [
              {
                "id": 123,
                "name": "Dede Fleet Customer"
              }
            ]
          }
        ]
      }
    }
  }
}

export const driverStatusIds = [
  {id: 2, statusName: 'active'},
  {id: 4, statusName: 'withRoute'},
  {id: 5, statusName: 'idle'},
  {id: 3, statusName: 'inactive'}
]

export const ordersStatusIds = [
  {id: 2, statusName: 'dispatching'},
  {id: 5, statusName: 'enRout'},
  {id: 8, statusName: 'requiringAttention'},
  {id: 9, statusName: 'delayed'}
]

/* Driver Status Ids (2, 5, 8, 9)
  dispatching: 2, enRout: 5, requiringAttention: 8, delayed: 9
*/
export default (statusIds = [], type) => {
  console.log("Status Ids", statusIds, type);
  if (_.isArray(statusIds)) {
    return type.reduce((obj, value) => {
      obj = obj || {};
      if (statusIds.includes(value.id)) obj[value.statusName] = mockData.orders[statusName];
      return camelize(obj);
    }, {});
  } else return {};
}
