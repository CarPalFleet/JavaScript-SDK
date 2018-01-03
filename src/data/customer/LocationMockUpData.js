export default locaitonsMockUp = {
  data: {
    total_records: 1,
    data: [
       {
        "id": 12345679,
        "priority": 2,
        "pickup_location_address_id": 345678,
        "pickup_location_address": "Blk 43, Holland Drive",
        "order_id": 000001,
        "pickup_date": "2017-12-31",
        "pickup_contact_name": "John Doe",
        "pickup_contact_company_name": "",
        "pickup_contact_email": "",
        "pickup_contact_phone": "",
        "pickup_time_window": "",
        "delivery_contact_name": "",
        "delivery_contact_company_name": "",
        "delivery_contact_email": "",
        "delivery_contact_phone": "",
        "delivery_date": "2017-12-31",
        "delivery_time_window": "",
        "delivery_address_id": 345678,
        "delivery_address": "",
        "delivery_notes": "",
        "driver_email_id": "",
        "item_quantity": 3,
        "item_description": "Cake",
        "dimensions": "",
        "customer_order_number": "",
        "custom_waybill_number": "",
        "cash_on_delivery_amount": "",
        "team": "",
        "is_validated": true
      }
    ]
  }
}

const result = {
  totalRecords: 1,
  errors: [{
    id: '1',
    'message': "text .... "
  }],
  data: [
    {
      id: null,
      address: null,
      jobs: [
        {
          "id": 123456012,
          "priority": 1,
          "recipient": "test recipient",
          "driver": "test1 driver",
          "pickup": "9:00 - 12Dec",
          "delivery": "10:00 - 12Dec",
          "address": "32 New Market Road",
          "isError": false
        },
        {
          "id": 123456013,
          "priority": 2,
          "recipient": "test recipient",
          "driver": "test1 driver",
          "pickup": "9:00 - 12Dec",
          "delivery": "10:00 - 12Dec",
          "address": "32 New Market Road",
          "isError": false
        },
        {
          "id": 123456014,
          "priority": 3,
          "recipient": "test recipient",
          "driver": "test1 driver",
          "pickup": "9:00 - 12Dec",
          "delivery": "10:00 - 12Dec",
          "address": "32 New Market Road",
          "isError": false
        }
      ]
    },
    {
      id: 1,
      address: '143 cecil street',
      jobs: [
        {
          "id": 12345601,
          "priority": 1,
          "recipient": "test1 recipient",
          "driver": "test1 driver",
          "pickup": "9:00 - 12Dec",
          "delivery": "10:00 - 12Dec",
          "address": "32 New Market Road",
          "isError": false
        },
        {
          "id": 12345602,
          "priority": 2,
          "recipient": "test1 recipient",
          "driver": "test2 driver",
          "pickup": "9:00 - 12 Dec",
          "delivery": "10:00 - 12Dec",
          "address": "32 New Market Road",
          "isError": false
        },
        {
          "id": 12345603,
          "priority": 3,
          "recipient": "test1 recipient",
          "driver": "test3 driver",
          "pickup": "9:00 - 12 Dec",
          "delivery": "10:00 - 12Dec",
          "address": "32 New Market Road",
          "isError": false
        },
      ]
    }
  }



  {
  "data": [
    {
      "pickupDate": "2018-01-03",
      "channelId": "asdfadsfadsfadsf234dsfa",
      "chunkProgression": 1,
      "errorContent": [
        {
          "groupingLocationId": 1,
          "Messages": {
            "priority": [],
            "deliveryNotes": [
              "blah"
            ],
            "pickupLocationSuggestion": "",
            "deliveryLocationSuggestion": ""
          }
        },
        {
          "groupingLocationId": 2,
          "Messages": {
            "priority": [
              "blah",
              "blah"
            ],
            "deliveryNotes": [
              "blah"
            ],
            "pickupLocationSuggestion": "",
            "deliveryLocationSuggestion": ""
          }
        }
      ],
      "errors": 1,
      "totalChunkProgression": "3",
      "id": "e88bcef4-f1fc-4b19-b6fe-3119069194ad",
      "customerId": 2318
    }
