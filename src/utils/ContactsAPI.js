const api = 'http://localhost:5001'

const headers = {
  'Accept': 'application/json'
}

export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const remove = (contact) =>
  fetch(`${api}/contacts/${contact._id}`, { method: 'DELETE', headers })
    .then(res => res)

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const edit = (contact) => 
  fetch(`${api}/contacts/${contact._id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  }).then(res => res.json())
