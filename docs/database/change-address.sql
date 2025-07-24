--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.address DROP CONSTRAINT IF EXISTS addres_pkey;
ALTER TABLE IF EXISTS public.address ALTER COLUMN address_id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.addres_addres_id_seq;
DROP TABLE IF EXISTS public.address;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.address (
    address_id integer NOT NULL,
    location text,
    neighborhood text,
    street text,
    house_number text,
    cep text
);


--
-- Name: addres_addres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.addres_addres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: addres_addres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.addres_addres_id_seq OWNED BY public.address.address_id;


--
-- Name: address address_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address ALTER COLUMN address_id SET DEFAULT nextval('public.addres_addres_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.address (address_id, location, neighborhood, street, house_number, cep) FROM stdin;
\.


--
-- Name: addres_addres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.addres_addres_id_seq', 1, false);


--
-- Name: address addres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT addres_pkey PRIMARY KEY (address_id);


--
-- PostgreSQL database dump complete
--

