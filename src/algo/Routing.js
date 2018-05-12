/**
 * @fileoverview This file contains all Routing related functions that are triggered by a User
 */

 // TODO: this file should be part of a seprate routing package in the future.

import axios from "axios";
import endpoints from "../data/Endpoint";
import camelize from "camelize";
import {apiResponseErrorHandler} from "../data/utility/Util";
import {camelToSnake} from "../data/utility/ChangeCase";

/**
 * Optimize route
 * @param {object} payload # {date, routeSettingId, routingScope}
 * date (mandatory)(string) = "2018-02-28" #pickupDate
 * routeSettingId (mandatory)(integer) = 124
 * routingScope (mandatory)(string) = "all"
 * @param {string} token
 * @return {object} Promise resolve/reject
 */
export const optimizeRouteAsync = async (payload = {}, token) => {
  try {
    const response = await axios({
      method: "POST",
      url: endpoints.API_V3.OPTIMIZE_ROUTE,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: camelToSnake(payload),
    });

    return camelize(response.data);
  } catch (e) {
    return apiResponseErrorHandler(e);
  }
};
