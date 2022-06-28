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
    if unit == 'us':
        bucket_size_us = bucket_size
        bucket_size_metric = yd3_to_m3(bucket_size)
        material_density_metric = lbyd3_to_kgm3(material_density)
        calc_value_us = (bucket_size_us * loading_tool.get('bucket_fill') * material_density / 2000)
        calc_value_metric = (bucket_size_metric * float(
            loading_tool.get('bucket_fill')) * material_density_metric / 1000)
    elif unit == 'metric':
        bucket_size_us = m3_to_yd3(bucket_size)
        bucket_size_metric = bucket_size
        material_density_us = kgm3_to_lbyd3(material_density)
        calc_value_us = (bucket_size_us * float(loading_tool.get('bucket_fill')) * material_density_us / 2000)
        calc_value_metric = (bucket_size_metric * loading_tool.get('bucket_fill') * material_density / 1000)
    return {
        'us': float(f'{calc_value_us:.6f}'),
        'metric': float(f'{calc_value_metric:.6f}'),
    }


def get_scoops_per_load(capacity_ton, tons_per_scoop, unit='us'):
    scoops_per_load_us = 0
    scoops_per_load_metric = 0
    if unit == 'us':
        capacity_ton_metric = short_ton_to_tonne(capacity_ton)
        scoops_per_load_us = float(capacity_ton) / float(tons_per_scoop.get(unit))
        scoops_per_load_metric = capacity_ton_metric / float(tons_per_scoop.get(unit))
    elif unit == 'metric':
        capacity_ton_us = tonne_to_short_ton(capacity_ton)
        scoops_per_load_us = capacity_ton_us / float(tons_per_scoop.get(unit))
        scoops_per_load_metric = float(capacity_ton) / float(tons_per_scoop.get(unit))

    # print(scoops_per_load)
    # print(math.trunc(scoops_per_load))

    # if scoops_per_load > 0:
    #     return float(f'{scoops_per_load:.2f}')
    #     # return math.trunc(scoops_per_load)
    # return scoops_per_load
    return {
        'us': float(f'{scoops_per_load_us:.2f}'),
        'metric': float(f'{scoops_per_load_metric:.2f}'),
    }


def get_minutes_per_load(scoops_per_load, truck_sport_time_sec, cycle_time_sec, unit='us'):
    us = 0
    metric = 0
    if scoops_per_load.get('us') > 0:
        us = (float(truck_sport_time_sec) + (scoops_per_load.get('us') * float(cycle_time_sec))) / 60
    if scoops_per_load.get('metric') > 0:
        metric = (float(truck_sport_time_sec) + (scoops_per_load.get('metric') * float(cycle_time_sec))) / 60
    return {
        'us': float(f'{us:.2f}'),
        'metric': float(f'{metric:.2f}'),
    }


def get_load_size(scoops_per_load, tons_per_load):
    return scoops_per_load * tons_per_load


def get_ld_number_of_trucks(cycle_time_sec, scoops_per_load, est_round_trip_travel_time, minutes_per_load):
    calc_value = (cycle_time_sec / 60 * (scoops_per_load - 1) + 6 / 60 + est_round_trip_travel_time) / minutes_per_load
    return calc_value
