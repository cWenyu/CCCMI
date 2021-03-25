SELECT a.id,a.date_get,a.score,a.ph,a.tmp,a.river_name,b.username FROM
(SELECT a.sample_id AS id,a.sample_date AS date_get,a.sample_score AS score,a.sample_ph AS ph,a.sample_tmp AS tmp,b.river_name AS river_name,
a.sample_user_id AS user_id_get
FROM aquality_server_samplerecord a JOIN aquality_server_river b on a.sample_river_id = b.river_id) a JOIN auth_user b on a.user_id_get = b.id