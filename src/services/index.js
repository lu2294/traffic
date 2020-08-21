import axios from "../utils/axios";

const BASE_URL = "15.112.169.142"; //开发环境

/**
 * 查询道路列表
 * @param {*} params
 */
export const getRoadNameList = (params) =>
  axios.post(`/roadnet/hppoc/getRoadNameList`, params);

/**
 * 查询左侧和右侧列表指标数据
 * @param {*} params
 */
export const selectRoadInfoByRoadId = (params) =>
  axios.post(`/roadnet/hppoc/leftData`, params);

/**
 * 全道路指标/路段 指标详情
 * @param {*} params
 */
export const selectDetailInfo = (params) =>
  axios.post(`/roadnet/hppoc/selectDetailInfo`, params);

/**
 * 一车一档
 * @param {*} params
 */
export const selectVehicleInfo = (params) =>
  axios.post(`/roadnet/hppoc/selectVehicleInfo`, params);

/**
 * 车牌号查询列表
 * @param {*} params
 */
export const selectListByjdcxh = (params) =>
  axios.post(`/roadnet/hppoc/selectListByjdcxh`, params);

/**
 * 获取雷视设备数据及码流地址
 * @param {*} params
 */
export const selectRadarVideoList = (params) =>
  axios.post(`/roadnet/hppoc/selectRadarVideoList`, params);
/**
 * 获取雷视设备数据及码流地址
 * @param {*} params
 */
export const selectAllRadar = (params) =>
  axios.post(`/roadnet/hppoc/selectAllRadar`, params);

/**
 * 获取事件详情
 * @param {*} params
 */
export const selectEventByEventId = () =>
  axios.post(`/roadnet/hppoc/selectEventDetilList`, {});

/**
 * 事件处置
 * @param {*} params
 */
export const postEventManage = (params) =>
  axios.post(`/roadnet/hppoc/eventManage`, params);

/**
 * 右边数据
 * @param {*} params
 */
export const rightData = (params) =>
  axios.post(`/roadnet/hppoc/rightData`, params);

/**
 * 天气
 * @param {*} params
 */
export const getWeather = (params) =>
  axios.post(
    `15.75.4.193.9777/forecastRealtime/getForecastRealtimeWeather`,
    params
  );
