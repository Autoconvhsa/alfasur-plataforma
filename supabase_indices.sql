-- =========================================================
-- Índices: le dicen a la base de datos "aquí busca rápido"
-- para las columnas que más se consultan (por asesor, por fecha).
-- Sin esto, cada búsqueda revisa TODA la tabla renglón por renglón;
-- con esto, va directo a lo que necesita — la diferencia se nota
-- sobre todo cuando ya tengas cientos o miles de registros.
-- =========================================================

-- Solicitudes y Cotizaciones: casi toda consulta filtra por asesor
-- (tanto tus pantallas como las reglas de seguridad RLS)
create index if not exists idx_solicitudes_asesor on solicitudes(asesor_id);
create index if not exists idx_cotizaciones_asesor on cotizaciones(asesor_id);

-- Citas: se consulta por asesor y también por fecha (Agenda, recordatorios)
create index if not exists idx_citas_asesor on citas(asesor_id);
create index if not exists idx_citas_fecha on citas(fecha);

-- Cobranza: se consulta por solicitud (ya tiene índice único de solicitud+mes,
-- pero este refuerza específicamente las búsquedas por solicitud_id solo)
create index if not exists idx_cobranza_solicitud on cobranza_pagos(solicitud_id);

-- Recordatorios enviados: se consulta por fecha para el trabajo automático de citas
create index if not exists idx_recordatorios_fecha on recordatorios_enviados(enviado_el);
