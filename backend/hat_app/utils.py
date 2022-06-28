from decimal import Decimal

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


def tons_per_scoop(loading_tool, material_density, unit='us'):
    calc_value_us = 0
    calc_value_metric = 0
    bucket_size = loading_tool.get('bucket_size')
    if unit == 'us':
        bucket_size_us = bucket_size
        bucket_size_metric = yd3_to_m3(bucket_size)
        material_density_us = material_density
        material_density_metric = lbyd3_to_kgm3(material_density)
        calc_value_us = bucket_size_us * loading_tool.get('bucket_fill') * material_density
        calc_value_metric = bucket_size_metric * float(loading_tool.get('bucket_fill')) * material_density_metric
    elif unit == 'metric':
        bucket_size_us = m3_to_yd3(bucket_size)
        bucket_size_metric = bucket_size
        material_density_us = kgm3_to_lbyd3(material_density)
        material_density_metric = material_density
        calc_value_us = bucket_size_us * float(loading_tool.get('bucket_fill')) * material_density_us
        calc_value_metric = bucket_size_metric * loading_tool.get('bucket_fill') * material_density
    return {
        'us': calc_value_us,
        'metric': calc_value_metric,
    }
