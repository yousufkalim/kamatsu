from decimal import Decimal
import math
import quantities as pq


def yd3_to_m3(yd3):
    m3 = float(yd3) * pq.yd ** 3
    m3.units = pq.m ** 3
    m3_value = m3.item()
    return float(f'{m3_value:.6f}')


def m3_to_yd3(m3):
    yd3 = float(m3) * pq.m ** 3
    yd3.units = pq.yd ** 3
    yd3_value = yd3.item()
    return float(f'{yd3_value:.6f}')


def lbyd3_to_kgm3(lbyd3):
    kgm3 = float(lbyd3) * (pq.lb / pq.yd ** 3)
    kgm3.units = pq.kg / pq.m ** 3
    kgm3_value = kgm3.item()
    return float(f'{kgm3_value:.6f}')


def kgm3_to_lbyd3(kgm3):
    lbyd3 = float(kgm3) * (pq.kg / pq.m ** 3)
    lbyd3.units = pq.lb / pq.yd ** 3
    lbyd3_value = lbyd3.item()
    return float(f'{lbyd3_value:.6f}')


def short_ton_to_tonne(short_ton):
    unit_value = float(short_ton) * pq.short_ton
    unit_value.units = pq.tonne
    tonne = unit_value.item()
    return float(f'{tonne:.6f}')


def tonne_to_short_ton(tonne):
    unit_value = float(tonne) * pq.tonne
    unit_value.units = pq.short_ton
    short_ton = unit_value.item()
    return float(f'{short_ton:.6f}')


def get_tons_per_scoop(loading_tool, material_density, unit='us'):
    calc_value_us = 0
    calc_value_metric = 0
    bucket_size = loading_tool.get('bucket_size')
    bucket_fill = loading_tool.get('bucket_fill')
    if unit == 'us':
        bucket_size_us = float(bucket_size)
        bucket_size_metric = yd3_to_m3(bucket_size)
        material_density_metric = lbyd3_to_kgm3(material_density)
        calc_value_us = (bucket_size_us * float(bucket_fill / 100) * float(material_density) / 2000)
        calc_value_metric = (bucket_size_metric * float(
            bucket_fill / 100) * material_density_metric / 1000)
    elif unit == 'metric':
        bucket_size_us = m3_to_yd3(bucket_size)
        bucket_size_metric = float(bucket_size)
        material_density_us = kgm3_to_lbyd3(material_density)
        calc_value_us = (bucket_size_us * float(bucket_fill / 100) * material_density_us / 2000)
        calc_value_metric = (bucket_size_metric * float(bucket_fill / 100) * float(material_density) / 1000)

    data = {
        'us': float(f'{calc_value_us:.2f}'),
        'metric': float(f'{calc_value_metric:.2f}'),
    }
    return data


def get_scoops_per_load(capacity_ton, tons_per_scoop, unit='us'):
    scoops_per_load_us = 0
    scoops_per_load_metric = 0
    if unit == 'us':
        capacity_ton_metric = short_ton_to_tonne(capacity_ton)
        scoops_per_load_us = float(capacity_ton) / float(tons_per_scoop.get(unit))
        scoops_per_load_metric = capacity_ton_metric / float(tons_per_scoop.get('metric'))
    elif unit == 'metric':
        capacity_ton_us = tonne_to_short_ton(capacity_ton)
        scoops_per_load_us = capacity_ton_us / float(tons_per_scoop.get('us'))
        scoops_per_load_metric = float(capacity_ton) / float(tons_per_scoop.get(unit))

    data = {
        'us': float(math.trunc(scoops_per_load_us)),
        'metric': float(math.trunc(scoops_per_load_metric)),
    }
    return data


def get_minutes_per_load(scoops_per_load, truck_sport_time_sec, cycle_time_sec, unit='us'):
    us = 0
    metric = 0

    scoops_per_load_us = math.trunc(scoops_per_load.get('us'))
    scoops_per_load_metric = math.trunc(scoops_per_load.get('metric'))

    us = (float(truck_sport_time_sec) + (scoops_per_load_us * float(cycle_time_sec))) / 60
    metric = (float(truck_sport_time_sec) + (scoops_per_load_metric * float(cycle_time_sec))) / 60

    # print(us)
    return {
        'us': float(f'{us:.3f}'),
        'metric': float(f'{metric:.3f}'),
    }


def get_load_size(scoops_per_load, tons_per_load):
    scoops_per_load_us = scoops_per_load.get('us')
    scoops_per_load_metric = scoops_per_load.get('metric')
    us = scoops_per_load_us * tons_per_load.get('us')
    metric = scoops_per_load_metric * tons_per_load.get('metric')
    return {
        'us': float(f'{us:.1f}'),
        'metric': float(f'{metric:.1f}'),
    }


def get_ld_number_of_trucks(cycle_time_sec, scoops_per_load, est_round_trip_travel_time, minutes_per_load):
    us = (float(cycle_time_sec) / 60 * (
            scoops_per_load.get('us') - 1) + 6 / 60 + float(est_round_trip_travel_time)) / minutes_per_load.get('us')
    metric = (float(cycle_time_sec) / 60 * (
            scoops_per_load.get('metric') - 1) + 6 / 60 + float(est_round_trip_travel_time)) / minutes_per_load.get(
        'metric')
    # values return round up
    return {
        'us': math.ceil(us),
        'metric': math.ceil(metric),
    }


def get_haulage_per_hour_weight(operator_efficiency, minutes_per_load, load_size):
    # print(minutes_per_load)
    # print(load_size)
    us = 0
    metric = 0
    minutes_per_load_us = minutes_per_load.get('us')
    minutes_per_load_metric = minutes_per_load.get('metric')
    load_size_us = load_size.get('us')
    load_size_metric = load_size.get('metric')
    if minutes_per_load_us > 0 and load_size_us > 0:
        us = round(float(operator_efficiency) / minutes_per_load_us * load_size_us)
    if minutes_per_load_metric > 0 and load_size_metric > 0:
        metric = round(float(operator_efficiency) / minutes_per_load_metric * load_size_metric)
    return {
        'us': us,
        'metric': metric,
    }


def get_haulage_per_hour(material_density, material_swell, haulage_per_hour_weight, unit='us'):
    # print('material_density:', material_density)
    # print('material_swell:', material_swell)
    # print('haulage_per_hour_weight:', haulage_per_hour_weight)
    us = 0
    metric = 0
    if unit == 'us':
        material_density_metric = lbyd3_to_kgm3(material_density)
        divided_by_us = (float(material_density) * float(1 + material_swell) * haulage_per_hour_weight.get('us'))
        divided_by_metric = (material_density_metric * float(1 + material_swell) * haulage_per_hour_weight.get('us'))
        if divided_by_us > 0:
            us = 2000 / divided_by_us
        if divided_by_metric > 0:
            metric = 1000 / divided_by_metric
    elif unit == 'metric':
        material_density_us = kgm3_to_lbyd3(material_density)
        divided_by_us = (material_density_us * float(1 + material_swell) * haulage_per_hour_weight.get('us'))
        divided_by_metric = (
                float(material_density) * float(1 + material_swell) * haulage_per_hour_weight.get('metric'))
        if divided_by_us > 0:
            us = 2000 / divided_by_us
        if divided_by_metric > 0:
            metric = 1000 / divided_by_metric

    if round(us) == 0:
        # print('us 0')
        us = haulage_per_hour_weight.get('us')
    if round(metric) == 0:
        metric = haulage_per_hour_weight.get('metric')
    data = {
        'us': float(f'{us:.1f}'),
        'metric': float(f'{metric:.1f}')
    }
    # print(data)
    return data


def get_truck_haulage(loading_tool, site_parameters, scoops_per_load, load_size, haulage_per_hour_weight,
                      ld_number_of_trucks, unit):
    operator_efficiency = float(site_parameters.get('operator_efficiency'))
    truck_sport_time_sec = site_parameters.get('truck_sport_time_sec')
    est_round_trip_travel_time = site_parameters.get('est_round_trip_travel_time')
    cycle_time_second = loading_tool.get('cycle_time_second')
    # res = (float(operator_efficiency) / (
    #         float((cycle_time_second / 60)) * (scoops_per_load.get(unit) - 1) + float(truck_sport_time_sec / 60) + (
    #         6 / 60) + float(est_round_trip_travel_time)) * load_size.get(unit) * float(
    #     ld_number_of_trucks - 1)) / haulage_per_hour_weight.get(unit)

    middle_value = float(cycle_time_second / 60) * (scoops_per_load.get(unit) - 1) + float(
        truck_sport_time_sec / 60) + (
                           6 / 60) + float(est_round_trip_travel_time)
    res = (operator_efficiency / middle_value) * load_size.get(unit) * float(ld_number_of_trucks - 1)

    return res


def get_minus_truck_haulage_from_one(minus_one_haulage, ld_number_of_trucks, item):
    minus_haulage = minus_one_haulage / (ld_number_of_trucks - 1) * (ld_number_of_trucks - item)
    return float(f'{minus_haulage:.2f}')


def get_minus_truck_list(loading_tool, site_parameters, scoops_per_load, load_size, haulage_per_hour_weight,
                         ld_number_of_trucks, unit='us'):
    us = []
    metric = []
    ld_number_of_trucks_us = math.ceil(ld_number_of_trucks.get('us'))
    ld_number_of_trucks_metric = math.ceil(ld_number_of_trucks.get('metric'))
    truck_haulage_minus_one_us = 0
    truck_haulage_minus_one_metric = 0
    for item in reversed(range(1, ld_number_of_trucks_us + 1)):
        # print(item, ld_number_of_trucks_us)
        if item != ld_number_of_trucks_us + 1 and item > 2:
            print(item - 1)
        if item == ld_number_of_trucks_us:
            truck_haulage_minus_one_us = get_truck_haulage(loading_tool, site_parameters, scoops_per_load,
                                                           load_size,
                                                           haulage_per_hour_weight,
                                                           item, unit='us')

            truck_haulage_minus_one_metric = get_truck_haulage(loading_tool, site_parameters, scoops_per_load,
                                                               load_size,
                                                               haulage_per_hour_weight,
                                                               item, unit='metric')

            us.append({
                'item': item,
                'name': f'{item} Trucks',
                'value_us': float(f'{truck_haulage_minus_one_us:.2f}'),
                'value_metric': float(f'{truck_haulage_minus_one_metric:.2f}'),
                'percentage': 100
            })
        elif item != ld_number_of_trucks_us and item > 1:
            truck_haulage_us = float(truck_haulage_minus_one_us) / float(ld_number_of_trucks_us - 1) * float(
                ld_number_of_trucks_us - item)

            truck_haulage_metric = float(truck_haulage_minus_one_metric) / float(ld_number_of_trucks_us - 1) * float(
                ld_number_of_trucks_us - item)

            percentage = (100 / truck_haulage_minus_one_us) * truck_haulage_us

            us.append({
                'item': ld_number_of_trucks_us - item + 1,
                'name': f'{ld_number_of_trucks_us - item + 1} Trucks',
                'value_us': float(f'{truck_haulage_us:.2f}'),
                'value_metric': float(f'{truck_haulage_metric:.2f}'),
                'percentage': float(f'{percentage:.0f}')
            })

    if len(us) > 0:
        return sorted(us, key=lambda d: d['item'], reverse=True)
    return us


def get_ld_unit_cost_per_hour(loading_tool, hauling_tool, ld_number_of_trucks, haulage_per_hour):
    loader_cost_per_hour = loading_tool.get('cost_per_hour')
    hauling_cost_per_hour = hauling_tool.get('cost_per_hour')
    try:
        cost = (float(loader_cost_per_hour) + (
                float(hauling_cost_per_hour) * ld_number_of_trucks.get('us'))) / haulage_per_hour.get('us')
    except Exception as err:
        print(err)
        cost = 0

    print(cost)

    return float(f'{cost:.2f}')


def get_units_per_hour(material_swell):
    # if material_swell == 0:
    return 0


def get_result_preview(fleet_definition, site_parameters):
    fleet_definition_unit = fleet_definition.get('unit_selection')
    site_parameters_unit = site_parameters.get('unit_selection')
    loading_tool = fleet_definition.get('loading_tool')
    hauling_tool = fleet_definition.get('hauling_tool')
    # bucket_size_us = loading_tool.get('bucket_size')
    material_density_us = site_parameters.get('material_density')
    material_density_metric = site_parameters.get('material_density')
    truck_sport_time_sec = site_parameters.get('truck_sport_time_sec')
    est_round_trip_travel_time = site_parameters.get('est_round_trip_travel_time')
    operator_efficiency = site_parameters.get('operator_efficiency')
    material_swell = site_parameters.get('material_swell')

    # if fleet_definition_unit == 'us':
    #     loading_tool['bucket_size'] = lbyd3_to_kgm3(material_density_us)
    if fleet_definition_unit == 'metric':
        hauling_tool['bucket_size'] = tonne_to_short_ton(hauling_tool.get('capacity_ton'))

    if site_parameters_unit == 'us':
        material_density_metric = lbyd3_to_kgm3(material_density_us)
    elif site_parameters_unit == 'metric':
        site_parameters['material_density'] = kgm3_to_lbyd3(material_density_metric)

    tons_per_scoop = get_tons_per_scoop(loading_tool, site_parameters['material_density'], unit='us')
    scoops_per_load = get_scoops_per_load(hauling_tool.get('capacity_ton'), tons_per_scoop, unit='us')

    minutes_per_load = get_minutes_per_load(scoops_per_load, truck_sport_time_sec,
                                            loading_tool.get('cycle_time_second'), unit='us')

    ld_number_of_trucks = get_ld_number_of_trucks(
        cycle_time_sec=loading_tool.get('cycle_time_second'),
        scoops_per_load=scoops_per_load,
        est_round_trip_travel_time=est_round_trip_travel_time,
        minutes_per_load=minutes_per_load
    )
    load_size = get_load_size(scoops_per_load, tons_per_scoop)

    haulage_per_hour_weight = get_haulage_per_hour_weight(operator_efficiency, minutes_per_load, load_size)

    haulage_per_hour = get_haulage_per_hour(material_density_us, material_swell, haulage_per_hour_weight,
                                            unit='us')

    minus_truck_list = get_minus_truck_list(
        loading_tool=loading_tool,
        site_parameters=site_parameters,
        scoops_per_load=scoops_per_load,
        load_size=load_size,
        haulage_per_hour_weight=haulage_per_hour_weight,
        ld_number_of_trucks=ld_number_of_trucks
    )
    ld_unit_cost_per_hour = get_ld_unit_cost_per_hour(loading_tool, hauling_tool, ld_number_of_trucks, haulage_per_hour)

    result = {
        'tons_per_scoop': tons_per_scoop,
        'scoops_per_load': scoops_per_load,
        'minutes_per_load': minutes_per_load,
        'ld_number_of_trucks': ld_number_of_trucks,
        'load_size': load_size,
        'haulage_per_hour_weight': haulage_per_hour_weight,
        'haulage_per_hour': haulage_per_hour,
        'trucks': minus_truck_list,
        'ld_unit_cost_per_hour': ld_unit_cost_per_hour,
        'units_per_hour': {},
    }
    return result


# ((35 / 60) * (4-1) + (15 / 60) + (6/60) + 10) * 89.5 * (5 - 1)
# (50 / () / 1732


middle = (50 / ((35 / 60) * (4 - 1) + (15 / 60) + (6 / 60) + 10)) * 89.5 * (5 - 1)
