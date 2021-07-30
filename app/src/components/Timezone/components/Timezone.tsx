import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Form, Select } from 'antd';
import styled from 'styled-components';

import { Layout } from '../../Profiles';

import COUNTRIES from '../../../data/countries.json';
import { toSnakeCase } from '../../../helper';

const Container = styled.div`
    padding-top: 1rem;

    .has-timezone {
        display: flex;
        flex-direction: row;
        column-gap: 0.5rem;
        align-items: center;
    }
`;

type CountryType = Record<string, string>;

export const Timezone = () => {
    const [hasTimezone, setHasTimezone] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [country, setCountry] = useState<CountryType>({});

    // Did mount
    useEffect(() => {
        const countries = [...COUNTRIES].map(({ timezone, offset }) => ({
            value: toSnakeCase(timezone),
            timezone,
            offset,
        }));
        setCountry(countries[0]);
        setCountries(countries);
    }, [COUNTRIES]);

    const handleTimezoneChange = useCallback((_, record) => {
        const { value, children: timezone, ...rest } = record;
        setCountry(() => ({ value, timezone, ...rest }));
    }, []);

    return (
        <Layout>
            <Container>
                <Form
                    initialValues={{
                        hasTimezone,
                    }}
                    layout='vertical'
                >
                    <Form.Item>
                        <div className='has-timezone'>
                            <Form.Item noStyle name='invitation'>
                                <Switch
                                    checked={hasTimezone}
                                    onChange={(value) => setHasTimezone(value)}
                                />
                            </Form.Item>
                            <span>
                                Fill timezone on browser profile start based on
                                the external IP.
                            </span>
                        </div>
                    </Form.Item>
                    {hasTimezone ? (
                        <div>
                            <Form.Item label='Timezone'>
                                <Select
                                    value={country.value ?? null}
                                    onChange={handleTimezoneChange}
                                    dropdownStyle={{ backgroundColor: '#fff' }}
                                >
                                    {countries.map(
                                        ({ timezone, value, offset }) => (
                                            <Select.Option
                                                key={`country-${value}`}
                                                value={value}
                                                offset={offset}
                                            >
                                                {timezone}
                                            </Select.Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                            <span>Offset UTC: {country.offset ?? ''}</span>
                        </div>
                    ) : null}
                </Form>
            </Container>
        </Layout>
    );
};
