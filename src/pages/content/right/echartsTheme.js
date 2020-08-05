export default {
    // 主色系
    "color": [
        "#361C91",
        "#224DC7",
        "#EA9559",
        "#D35D5D",
        "#24C9DA",
        "#7884DD",
        "#245FDA",
        "#cc7e63",
        "#724e58",
        "#4b565b"
    ],
    // 字体，包括legend、title等
    "textStyle": {
        
    },
    // title
    "title": {
        "textStyle": {
            "color": "#cccccc"
        },
        "subtextStyle": {
            "color": "#cccccc"
        }
    },
    // 折线
    "line": {
        "itemStyle": {
            "normal": {
                "borderWidth": 1
            }
        },
        "lineStyle": {
            "normal": {
                "width": 2
            }
        },
        // 折线图上面标记的大小
        "symbolSize": "5",
        "symbol": "emptyCircle",
        "smooth": true
    },
    // 饼图
    "pie": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
            }
        }
    },
    // 横轴相关属性
    "categoryAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999",
                "fontSize": "14"
            }
        },
        "splitLine": {
            "show": false,
            "lineStyle": {
                "color": [
                    "#f1f3f5"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    // 纵轴相关属性
    "valueAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#f1f3f5"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999",
                "fontSize": "14"
            }
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    "#f1f3f5"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
            }
        }
    },
    // toolbox
    "toolbox": {
        "iconStyle": {
            "normal": {
                "borderColor": "#999999"
            },
            "emphasis": {
                "borderColor": "#666666"
            }
        }
    },
    // legend
    "legend": {
        "textStyle": {
            "color": "#333333"
        }
    },
    // tooltip
    "tooltip": {
        "axisPointer": {
            "lineStyle": {
                "color": "#cccccc",
                "width": 1
            },
            "crossStyle": {
                "color": "#cccccc",
                "width": 1
            }
        }
    },
    "timeline": {
        "lineStyle": {
            "color": "#293c55",
            "width": 1
        },
        "itemStyle": {
            "normal": {
                "color": "#293c55",
                "borderWidth": 1
            },
            "emphasis": {
                "color": "#a9334c"
            }
        },
        "controlStyle": {
            "normal": {
                "color": "#293c55",
                "borderColor": "#293c55",
                "borderWidth": 0.5
            },
            "emphasis": {
                "color": "#293c55",
                "borderColor": "#293c55",
                "borderWidth": 0.5
            }
        },
        "checkpointStyle": {
            "color": "#e43c59",
            "borderColor": "rgba(194,53,49,0.5)"
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#293c55"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#293c55"
                }
            }
        }
    },
    "markPoint": {
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ffffff"
                }
            }
        }
    }
}